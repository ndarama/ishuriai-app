-- Execute this SQL in your Supabase SQL Editor to create the user_profile table
-- Go to: https://uwgtvdtyzoezajrmvlky.supabase.co/project/uwgtvdtyzoezajrmvlky/sql

-- Create user_profile table
-- This table extends the default Supabase auth.users with additional profile information

CREATE TABLE IF NOT EXISTS public.user_profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    school VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('Student', 'Teacher', 'Parent')),
    email VARCHAR(255) NOT NULL,
    accept_terms BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profile_user_id ON public.user_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profile_username ON public.user_profile(username);
CREATE INDEX IF NOT EXISTS idx_user_profile_email ON public.user_profile(email);
CREATE INDEX IF NOT EXISTS idx_user_profile_user_type ON public.user_profile(user_type);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile" ON public.user_profile
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.user_profile
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.user_profile
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_user_profile_updated_at
    BEFORE UPDATE ON public.user_profile
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.user_profile TO authenticated;
GRANT ALL ON public.user_profile TO service_role;

-- Setup subscription system
-- Include all subscription-related tables and functions
\i database/create_plans_table.sql
\i database/add_plan_column.sql

-- Create view for easy user management with subscription info
CREATE OR REPLACE VIEW public.user_dashboard AS
SELECT 
    up.id,
    up.user_id,
    up.full_name,
    up.username,
    up.email,
    up.user_type,
    up.school,
    up.level,
    up.plan as current_plan,
    p.name as plan_name,
    p.monthly_price_rwf,
    p.annual_price_rwf,
    us.billing_cycle,
    us.status as subscription_status,
    us.current_period_end,
    CASE 
        WHEN us.current_period_end > NOW() AND us.status = 'active' THEN true
        WHEN up.plan = 'free' THEN true
        ELSE false
    END as has_active_subscription,
    up.created_at,
    up.updated_at
FROM public.user_profile up
LEFT JOIN public.user_subscriptions us ON up.current_subscription_id = us.id
LEFT JOIN public.plans p ON us.plan_id = p.id;

-- Grant permissions on the view
GRANT SELECT ON public.user_dashboard TO authenticated;
