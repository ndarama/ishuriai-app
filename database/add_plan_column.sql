-- Add plan column to user_profile table
-- This migration adds subscription plan tracking to user profiles
-- Updated to work with the new plans table structure

ALTER TABLE public.user_profile 
ADD COLUMN IF NOT EXISTS plan VARCHAR(20) NOT NULL DEFAULT 'free' 
CHECK (plan IN ('free', 'standard', 'premium'));

-- Create index for plan field for better performance
CREATE INDEX IF NOT EXISTS idx_user_profile_plan ON public.user_profile(plan);

-- Add comments
COMMENT ON COLUMN public.user_profile.plan IS 'User subscription plan: free, standard, or premium';

-- Add current_subscription_id to link with user_subscriptions table
ALTER TABLE public.user_profile 
ADD COLUMN IF NOT EXISTS current_subscription_id INTEGER REFERENCES public.user_subscriptions(id);

-- Create index for subscription reference
CREATE INDEX IF NOT EXISTS idx_user_profile_subscription ON public.user_profile(current_subscription_id);

-- Add comment for subscription reference
COMMENT ON COLUMN public.user_profile.current_subscription_id IS 'Reference to current active subscription in user_subscriptions table';

-- Create function to update user_profile.plan when subscription changes
CREATE OR REPLACE FUNCTION public.update_user_profile_plan()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user_profile.plan based on the subscription
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.user_profile 
        SET 
            plan = (SELECT slug FROM public.plans WHERE id = NEW.plan_id),
            current_subscription_id = CASE 
                WHEN NEW.status = 'active' AND NEW.current_period_end > NOW() THEN NEW.id 
                ELSE NULL 
            END
        WHERE user_id = NEW.user_id;
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update user_profile.plan
DROP TRIGGER IF EXISTS trigger_update_user_profile_plan ON public.user_subscriptions;
CREATE TRIGGER trigger_update_user_profile_plan
    AFTER INSERT OR UPDATE ON public.user_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_profile_plan();
