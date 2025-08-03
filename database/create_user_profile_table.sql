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

-- Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Note: The actual profile data will be inserted by the application
    -- This trigger ensures we have the proper structure in place
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Create trigger to handle new user creation
-- (Uncomment if you want automatic profile creation on user signup)
-- CREATE TRIGGER on_auth_user_created
--     AFTER INSERT ON auth.users
--     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
