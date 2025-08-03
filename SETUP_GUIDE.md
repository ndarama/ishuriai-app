# Complete Setup Guide for User Profile System

## 🎯 Overview
This guide will help you set up the user profile system that records all registration fields in the `user_profile` database table.

## 📋 Prerequisites
- Supabase project is set up with the credentials in your `.env` file
- Node.js and npm are installed
- Your React application is working

## 🗄️ Step 1: Set Up Database Table

1. **Go to your Supabase Dashboard**
   - URL: https://uwgtvdtyzoezajrmvlky.supabase.co
   - Navigate to: **SQL Editor**

2. **Execute the Database Setup Script**
   Copy and paste the contents from `setup_database.sql` into the SQL Editor and run it.

   The script will create:
   - `user_profile` table with all required fields
   - Row Level Security (RLS) policies
   - Indexes for performance
   - Triggers for automatic timestamps

## 🚀 Step 2: Start Development Server

```bash
cd "d:\Project AI\ishuri-ai-clone\ishuri-ai"
npm run dev
```

## 🧪 Step 3: Test the System

### Option A: Use Debug Tool
1. Navigate to: `http://localhost:5173/debug/database`
2. Run the following tests in order:
   - **Check Supabase Configuration**
   - **Test Profile Table Access**
   - **Test Full Registration Process**

### Option B: Manual Testing
1. Go to: `http://localhost:5173/auth/register`
2. Fill out the complete registration form with:
   - Email address
   - Password (6+ characters)
   - Confirm password
   - Full name
   - Username (unique)
   - Date of birth
   - School/Institution
   - User type (Student/Teacher/Parent)
   - Level (based on user type)
   - Accept terms checkbox

3. Submit the form and observe the console logs

## 🔍 Step 4: Verify Database Records

After successful registration, check your Supabase database:

1. Go to **Supabase Dashboard > Table Editor**
2. Select `user_profile` table
3. Verify that a new record was created with all the field data

## 📝 Expected Behavior

### Scenario 1: Email Confirmation Disabled
- User is created and immediately logged in
- Profile is created immediately
- User is redirected to `/apps`

### Scenario 2: Email Confirmation Enabled
- User is created but not logged in
- Profile data is stored in user metadata
- User receives confirmation email
- After confirmation and login, profile is created from stored metadata

## 🚨 Troubleshooting

### Database Table Not Found
**Error**: `relation "public.user_profile" does not exist`
**Solution**: Execute `setup_database.sql` in Supabase SQL Editor

### Permission Denied
**Error**: `permission denied for table user_profile`
**Solution**: The script includes proper permissions, but you may need to check RLS policies

### Username Already Exists
**Error**: `duplicate key value violates unique constraint`
**Solution**: The form includes username availability checking to prevent this

### Profile Creation Fails
**Error**: Various profile creation errors
**Solution**: Check the browser console for detailed error messages

## 🧩 Integration Points

### Registration Form (`ProfileRegistrationForm.jsx`)
- Comprehensive form with all fields
- Real-time validation
- Username availability checking
- Dynamic level options based on user type

### Authentication Service (`authService.js`)
- `signUpWithProfile()` - Complete registration with profile
- `createProfileAfterConfirmation()` - Create profile after email confirmation

### User Service (`userService.js`)
- `createUserProfile()` - Core profile creation
- `getUserProfileFromDB()` - Retrieve user profile
- `updateUserProfile()` - Update existing profile
- `checkUsernameAvailability()` - Check if username is available

### Login Flow (`LoginPage.jsx`)
- Automatic profile creation for confirmed users without profiles
- Graceful handling of missing profiles

## 📊 Database Schema

```sql
user_profile (
  id UUID PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id),
  full_name VARCHAR(255) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  date_of_birth DATE NOT NULL,
  school VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  user_type VARCHAR(20) CHECK (IN 'Student', 'Teacher', 'Parent'),
  email VARCHAR(255) NOT NULL,
  accept_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## 🔐 Security Features

- **Row Level Security (RLS)**: Users can only access their own profile
- **Data Validation**: Both client-side and database-level validation
- **Unique Constraints**: Username and user_id uniqueness enforced
- **Input Sanitization**: Proper validation of all input fields

## 📱 User Types and Levels

### Student Levels
- Pre-Primary through Primary 6
- S1-S6 (Secondary)
- University Year 1-4, Masters, PhD

### Teacher Levels
- Pre-Primary/Primary/Secondary Teacher
- University Lecturer, Private Tutor, Administrator

### Parent Levels
- Parent of Pre-Primary/Primary/Secondary/University Student
- Guardian

## ✅ Success Criteria

The system is working correctly when:

1. ✅ Database table exists and is accessible
2. ✅ Registration form accepts all required fields
3. ✅ User account is created in Supabase auth
4. ✅ Profile record is created in `user_profile` table
5. ✅ All form data is properly stored
6. ✅ Username uniqueness is enforced
7. ✅ Login creates missing profiles from metadata
8. ✅ RLS policies protect user data

## 🆘 Need Help?

If you encounter issues:

1. Check browser console for JavaScript errors
2. Check Supabase logs for database errors
3. Use the debug tool at `/debug/database`
4. Verify environment variables are correct
5. Ensure the database setup script was executed successfully

## 🎉 Next Steps

After successful setup:
- Customize the user levels for your specific needs
- Add profile editing functionality
- Implement profile pictures/avatars
- Add additional profile fields as needed
- Set up email templates for better user experience
