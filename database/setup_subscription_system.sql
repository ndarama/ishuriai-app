-- Complete database setup script for Ishuri AI subscription system
-- Run this script to set up all tables and relationships

-- First, ensure the required extensions are enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create plans table (run this first)
\i database/create_plans_table.sql

-- Create user profile table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_profile (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    avatar_url TEXT,
    plan VARCHAR(20) NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'standard', 'premium')),
    current_subscription_id INTEGER REFERENCES public.user_subscriptions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add plan column to existing user_profile table
\i database/add_plan_column.sql

-- Create view for easy subscription management
CREATE OR REPLACE VIEW public.user_subscription_details AS
SELECT 
    up.user_id,
    up.full_name,
    up.plan as current_plan,
    p.name as plan_name,
    p.monthly_price_rwf,
    p.annual_price_rwf,
    us.billing_cycle,
    us.status as subscription_status,
    us.current_period_start,
    us.current_period_end,
    us.cancel_at_period_end,
    pm.name as payment_method_name
FROM public.user_profile up
LEFT JOIN public.user_subscriptions us ON up.current_subscription_id = us.id
LEFT JOIN public.plans p ON us.plan_id = p.id
LEFT JOIN public.payment_methods pm ON us.payment_method_id = pm.id;

-- Grant necessary permissions
GRANT SELECT ON public.plans TO authenticated;
GRANT SELECT ON public.payment_methods TO authenticated;
GRANT ALL ON public.user_subscriptions TO authenticated;
GRANT ALL ON public.payment_transactions TO authenticated;
GRANT SELECT ON public.user_subscription_details TO authenticated;

-- Create function to initialize free subscription for new users
CREATE OR REPLACE FUNCTION public.initialize_user_subscription()
RETURNS TRIGGER AS $$
DECLARE
    free_plan_id INTEGER;
BEGIN
    -- Get the free plan ID
    SELECT id INTO free_plan_id FROM public.plans WHERE slug = 'free';
    
    -- Create a free subscription for the new user
    INSERT INTO public.user_subscriptions (
        user_id,
        plan_id,
        billing_cycle,
        status,
        current_period_start,
        current_period_end
    ) VALUES (
        NEW.user_id,
        free_plan_id,
        'monthly',
        'active',
        NOW(),
        NOW() + INTERVAL '100 years' -- Free plan never expires
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to initialize subscription for new user profiles
DROP TRIGGER IF EXISTS trigger_initialize_user_subscription ON public.user_profile;
CREATE TRIGGER trigger_initialize_user_subscription
    AFTER INSERT ON public.user_profile
    FOR EACH ROW
    EXECUTE FUNCTION public.initialize_user_subscription();

-- Create function to upgrade/downgrade subscription
CREATE OR REPLACE FUNCTION public.change_user_subscription(
    user_uuid UUID,
    new_plan_slug VARCHAR(50),
    new_billing_cycle VARCHAR(20),
    payment_method_slug VARCHAR(50) DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    new_plan_id INTEGER;
    payment_method_id INTEGER;
    new_subscription_id INTEGER;
    plan_price INTEGER;
    period_end TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Get the new plan ID and price
    SELECT id, 
           CASE 
               WHEN new_billing_cycle = 'annual' THEN annual_price_rwf 
               ELSE monthly_price_rwf 
           END
    INTO new_plan_id, plan_price
    FROM public.plans 
    WHERE slug = new_plan_slug AND is_active = true;
    
    IF new_plan_id IS NULL THEN
        RETURN json_build_object('success', false, 'error', 'Plan not found');
    END IF;
    
    -- Get payment method ID if provided
    IF payment_method_slug IS NOT NULL THEN
        SELECT id INTO payment_method_id
        FROM public.payment_methods 
        WHERE slug = payment_method_slug AND is_active = true;
    END IF;
    
    -- Calculate period end
    period_end := CASE 
        WHEN new_billing_cycle = 'annual' THEN NOW() + INTERVAL '1 year'
        WHEN new_billing_cycle = 'monthly' THEN NOW() + INTERVAL '1 month'
        ELSE NOW() + INTERVAL '100 years' -- Free plan
    END;
    
    -- Cancel existing active subscriptions
    UPDATE public.user_subscriptions 
    SET status = 'cancelled', cancel_at_period_end = true
    WHERE user_id = user_uuid AND status = 'active';
    
    -- Create new subscription
    INSERT INTO public.user_subscriptions (
        user_id,
        plan_id,
        billing_cycle,
        status,
        current_period_start,
        current_period_end,
        payment_method_id
    ) VALUES (
        user_uuid,
        new_plan_id,
        new_billing_cycle,
        'active',
        NOW(),
        period_end,
        payment_method_id
    ) RETURNING id INTO new_subscription_id;
    
    RETURN json_build_object(
        'success', true, 
        'subscription_id', new_subscription_id,
        'plan_slug', new_plan_slug,
        'billing_cycle', new_billing_cycle,
        'amount_rwf', plan_price,
        'period_end', period_end
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
