-- Create plans table to store subscription plan details
-- This table defines the available subscription plans with their features and pricing

CREATE TABLE IF NOT EXISTS public.plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    monthly_price_rwf INTEGER NOT NULL DEFAULT 0,
    annual_price_rwf INTEGER NOT NULL DEFAULT 0,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plans_name ON public.plans(name);
CREATE INDEX IF NOT EXISTS idx_plans_slug ON public.plans(slug);
CREATE INDEX IF NOT EXISTS idx_plans_is_active ON public.plans(is_active);
CREATE INDEX IF NOT EXISTS idx_plans_sort_order ON public.plans(sort_order);

-- Add comments
COMMENT ON TABLE public.plans IS 'Subscription plans with pricing and features';
COMMENT ON COLUMN public.plans.id IS 'Unique identifier for the plan';
COMMENT ON COLUMN public.plans.name IS 'Display name of the plan (e.g., Free, Standard, Premium)';
COMMENT ON COLUMN public.plans.slug IS 'URL-friendly identifier for the plan';
COMMENT ON COLUMN public.plans.description IS 'Brief description of the plan';
COMMENT ON COLUMN public.plans.monthly_price_rwf IS 'Monthly price in Rwandan Francs';
COMMENT ON COLUMN public.plans.annual_price_rwf IS 'Annual price in Rwandan Francs';
COMMENT ON COLUMN public.plans.features IS 'JSON array of plan features';
COMMENT ON COLUMN public.plans.is_active IS 'Whether the plan is currently available for subscription';
COMMENT ON COLUMN public.plans.sort_order IS 'Display order of plans (lower numbers first)';

-- Insert the initial plans data
INSERT INTO public.plans (name, slug, description, monthly_price_rwf, annual_price_rwf, features, sort_order) VALUES
(
    'Free',
    'free',
    'Start with the basics',
    0,
    0,
    '[
        "Calculator, Dictionary, Formula & Periodic Table",
        "Access to free learning resources",
        "No credit card required"
    ]'::jsonb,
    1
),
(
    'Standard',
    'standard',
    'Advanced tools for everyday learning',
    5900,
    59000,
    '[
        "Everything in Free",
        "AI Assistant for all subjects",
        "ExamsPrep Lite & Traffic Analytics"
    ]'::jsonb,
    2
),
(
    'Premium',
    'premium',
    'Unlock the full experience',
    11900,
    119000,
    '[
        "Everything in Standard",
        "ExamsPrep Advance",
        "Problem Solver & Interactive Stories"
    ]'::jsonb,
    3
);

-- Create payment methods table
CREATE TABLE IF NOT EXISTS public.payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    provider VARCHAR(50) NOT NULL,
    country_code VARCHAR(3) NOT NULL DEFAULT 'RWA',
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add payment methods data
INSERT INTO public.payment_methods (name, slug, provider, sort_order) VALUES
('MTN Mobile Money Rwanda', 'mtn-momo-rw', 'MTN', 1),
('Airtel Money Rwanda', 'airtel-money-rw', 'Airtel', 2);

-- Create user subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES public.plans(id),
    billing_cycle VARCHAR(20) NOT NULL CHECK (billing_cycle IN ('monthly', 'annual')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended')),
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    payment_method_id INTEGER REFERENCES public.payment_methods(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user subscriptions
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_plan_id ON public.user_subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_current_period_end ON public.user_subscriptions(current_period_end);

-- Add comments for user subscriptions
COMMENT ON TABLE public.user_subscriptions IS 'User subscription records with billing information';
COMMENT ON COLUMN public.user_subscriptions.billing_cycle IS 'Billing frequency: monthly or annual';
COMMENT ON COLUMN public.user_subscriptions.status IS 'Subscription status: active, cancelled, expired, or suspended';
COMMENT ON COLUMN public.user_subscriptions.current_period_start IS 'Start date of current billing period';
COMMENT ON COLUMN public.user_subscriptions.current_period_end IS 'End date of current billing period';
COMMENT ON COLUMN public.user_subscriptions.cancel_at_period_end IS 'Whether subscription will be cancelled at period end';

-- Create payment transactions table
CREATE TABLE IF NOT EXISTS public.payment_transactions (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subscription_id INTEGER REFERENCES public.user_subscriptions(id),
    payment_method_id INTEGER REFERENCES public.payment_methods(id),
    amount_rwf INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'RWF',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled', 'refunded')),
    transaction_reference VARCHAR(100),
    provider_transaction_id VARCHAR(100),
    provider_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for payment transactions
CREATE INDEX IF NOT EXISTS idx_payment_transactions_user_id ON public.payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_subscription_id ON public.payment_transactions(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON public.payment_transactions(status);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_transaction_reference ON public.payment_transactions(transaction_reference);

-- Add comments for payment transactions
COMMENT ON TABLE public.payment_transactions IS 'Payment transaction records for subscriptions';
COMMENT ON COLUMN public.payment_transactions.amount_rwf IS 'Payment amount in Rwandan Francs';
COMMENT ON COLUMN public.payment_transactions.transaction_reference IS 'Internal transaction reference';
COMMENT ON COLUMN public.payment_transactions.provider_transaction_id IS 'Payment provider transaction ID';
COMMENT ON COLUMN public.payment_transactions.provider_response IS 'JSON response from payment provider';

-- Enable Row Level Security (RLS)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Plans: readable by everyone (public data)
CREATE POLICY "Plans are readable by everyone" ON public.plans
    FOR SELECT USING (true);

-- Payment methods: readable by everyone (public data)
CREATE POLICY "Payment methods are readable by everyone" ON public.payment_methods
    FOR SELECT USING (true);

-- User subscriptions: users can only see their own subscriptions
CREATE POLICY "Users can view their own subscriptions" ON public.user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions" ON public.user_subscriptions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" ON public.user_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Payment transactions: users can only see their own transactions
CREATE POLICY "Users can view their own transactions" ON public.payment_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" ON public.payment_transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to get user's current active subscription
CREATE OR REPLACE FUNCTION public.get_user_current_subscription(user_uuid UUID)
RETURNS TABLE (
    subscription_id INTEGER,
    plan_name VARCHAR(50),
    plan_slug VARCHAR(50),
    billing_cycle VARCHAR(20),
    status VARCHAR(20),
    current_period_end TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        us.id as subscription_id,
        p.name as plan_name,
        p.slug as plan_slug,
        us.billing_cycle,
        us.status,
        us.current_period_end
    FROM public.user_subscriptions us
    JOIN public.plans p ON us.plan_id = p.id
    WHERE us.user_id = user_uuid 
        AND us.status = 'active'
        AND us.current_period_end > NOW()
    ORDER BY us.current_period_end DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has access to specific features
CREATE OR REPLACE FUNCTION public.user_has_plan_access(user_uuid UUID, required_plan_slug VARCHAR(50))
RETURNS BOOLEAN AS $$
DECLARE
    user_plan_order INTEGER;
    required_plan_order INTEGER;
BEGIN
    -- Get user's current plan order
    SELECT p.sort_order INTO user_plan_order
    FROM public.user_subscriptions us
    JOIN public.plans p ON us.plan_id = p.id
    WHERE us.user_id = user_uuid 
        AND us.status = 'active'
        AND us.current_period_end > NOW()
    ORDER BY p.sort_order DESC
    LIMIT 1;
    
    -- If no active subscription, user has free plan (sort_order = 1)
    IF user_plan_order IS NULL THEN
        user_plan_order := 1;
    END IF;
    
    -- Get required plan order
    SELECT sort_order INTO required_plan_order
    FROM public.plans
    WHERE slug = required_plan_slug AND is_active = true;
    
    -- Return true if user's plan order is >= required plan order
    RETURN user_plan_order >= COALESCE(required_plan_order, 999);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
