-- Add phone number columns to user_profile table
-- For MTN Rwanda and AIRTEL Rwanda phone numbers

-- Add phone number columns
ALTER TABLE public.user_profile 
ADD COLUMN IF NOT EXISTS mtn_phone VARCHAR(15);

ALTER TABLE public.user_profile 
ADD COLUMN IF NOT EXISTS airtel_phone VARCHAR(15);

-- Add constraints for phone number formats
-- MTN Rwanda: starts with 078, 079
-- AIRTEL Rwanda: starts with 073, 075

-- Add check constraints for phone number formats
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_mtn_phone_format') THEN
        ALTER TABLE public.user_profile 
        ADD CONSTRAINT check_mtn_phone_format 
        CHECK (mtn_phone IS NULL OR mtn_phone ~ '^(\+25078\d{7}|078\d{7}|\+25079\d{7}|079\d{7})$');
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_airtel_phone_format') THEN
        ALTER TABLE public.user_profile 
        ADD CONSTRAINT check_airtel_phone_format 
        CHECK (airtel_phone IS NULL OR airtel_phone ~ '^(\+25073\d{7}|073\d{7}|\+25072\d{7}|072\d{7})$');
    END IF;
END $$;

-- Add at least one phone number requirement
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_at_least_one_phone') THEN
        ALTER TABLE public.user_profile 
        ADD CONSTRAINT check_at_least_one_phone 
        CHECK (mtn_phone IS NOT NULL OR airtel_phone IS NOT NULL);
    END IF;
END $$;

-- Add indexes for phone numbers
CREATE INDEX IF NOT EXISTS idx_user_profile_mtn_phone ON public.user_profile(mtn_phone);
CREATE INDEX IF NOT EXISTS idx_user_profile_airtel_phone ON public.user_profile(airtel_phone);

-- Add unique constraints for phone numbers (each phone number should be unique)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_mtn_phone') THEN
        ALTER TABLE public.user_profile 
        ADD CONSTRAINT unique_mtn_phone UNIQUE (mtn_phone);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_airtel_phone') THEN
        ALTER TABLE public.user_profile 
        ADD CONSTRAINT unique_airtel_phone UNIQUE (airtel_phone);
    END IF;
END $$;

-- Update the updated_at timestamp for any existing records
UPDATE public.user_profile SET updated_at = NOW() WHERE id IS NOT NULL;
