# User Profile System Setup

This document explains how to set up and use the user profile system that extends Supabase authentication with additional user information.

## Database Setup

### 1. Run the SQL Migration

Execute the SQL script in your Supabase SQL Editor:

```sql
-- Copy the contents from database/create_user_profile_table.sql
-- and run it in your Supabase dashboard under SQL Editor
```

This will create:
- `user_profile` table with all required fields
- Row Level Security (RLS) policies
- Indexes for better performance
- Triggers for automatic timestamp updates

### 2. Table Structure

The `user_profile` table includes:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `user_id` | UUID | Foreign key to `auth.users` |
| `full_name` | VARCHAR(255) | User's full name |
| `username` | VARCHAR(50) | Unique username |
| `date_of_birth` | DATE | User's date of birth |
| `school` | VARCHAR(255) | School/Institution name |
| `level` | VARCHAR(50) | Academic level |
| `user_type` | VARCHAR(20) | Student, Teacher, or Parent |
| `email` | VARCHAR(255) | Email address |
| `accept_terms` | BOOLEAN | Terms acceptance status |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

## Implementation

### 1. Registration with Profile

Use the new `signUpWithProfile` function for complete user registration:

```javascript
import { signUpWithProfile } from './services/authService';

const registerUser = async () => {
  try {
    const result = await signUpWithProfile({
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      profileData: {
        fullName: 'John Doe',
        username: 'johndoe123',
        dateOfBirth: '1990-01-01',
        school: 'Example University',
        level: 'University Year 2',
        userType: 'Student',
        acceptTerms: true
      }
    });
    
    if (result.needsEmailConfirmation) {
      // Handle email confirmation flow
    } else {
      // User is ready to use the app
    }
  } catch (error) {
    console.error('Registration failed:', error.message);
  }
};
```

### 2. Profile Management

Use the `userService` functions to manage user profiles:

```javascript
import { 
  createUserProfile, 
  getUserProfileFromDB, 
  updateUserProfile,
  checkUsernameAvailability 
} from './services/userService';

// Get user profile
const profile = await getUserProfileFromDB();

// Update profile
const updatedProfile = await updateUserProfile({
  full_name: 'New Name',
  school: 'New School'
});

// Check username availability
const isAvailable = await checkUsernameAvailability('newusername');
```

### 3. Registration Form Component

Use the `ProfileRegistrationForm` component for user registration:

```javascript
import ProfileRegistrationForm from './components/ProfileRegistrationForm';

const RegistrationPage = () => {
  const handleRegistrationSuccess = (result) => {
    // Handle successful registration
    console.log('User registered:', result);
  };

  const handleCancel = () => {
    // Handle registration cancellation
    navigate('/login');
  };

  return (
    <ProfileRegistrationForm
      onSuccess={handleRegistrationSuccess}
      onCancel={handleCancel}
    />
  );
};
```

## User Types and Levels

### Student Levels
- Pre-Primary
- Primary 1-6
- S1-S6 (Secondary)
- University Year 1-4
- Masters
- PhD

### Teacher Levels
- Pre-Primary Teacher
- Primary Teacher
- Secondary Teacher
- University Lecturer
- Private Tutor
- Administrator

### Parent Levels
- Parent of Pre-Primary
- Parent of Primary
- Parent of Secondary
- Parent of University Student
- Guardian

## Security Features

### Row Level Security (RLS)
- Users can only access their own profile data
- Automatic security policies enforce data isolation
- Secure by default

### Data Validation
- Client-side validation for all fields
- Server-side constraints in database
- Username uniqueness checks
- Email format validation
- Password strength requirements

## Error Handling

The system includes comprehensive error handling:

- Network errors
- Validation errors
- Database constraint violations
- Authentication failures
- Profile creation failures

## Environment Variables

Ensure your `.env` file includes:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Integration with Existing Pages

### Update RegisterPage.jsx

Replace the existing registration logic with the new `ProfileRegistrationForm`:

```javascript
import ProfileRegistrationForm from '../components/ProfileRegistrationForm';

const RegisterPage = () => {
  // ... existing code

  return (
    <ProfileRegistrationForm
      onSuccess={(result) => {
        // Handle success
        navigate('/dashboard');
      }}
      onCancel={() => {
        navigate('/login');
      }}
    />
  );
};
```

## Testing

1. Test user registration with all required fields
2. Verify username uniqueness checking
3. Test profile retrieval and updates
4. Verify RLS policies work correctly
5. Test error handling scenarios

## Migration Notes

If you have existing users, you may need to:

1. Create profiles for existing users
2. Migrate existing user data to the new structure
3. Update authentication flows

## Support

For issues or questions about the user profile system:

1. Check Supabase logs for database errors
2. Verify environment variables are set correctly
3. Ensure the SQL migration was executed successfully
4. Check browser console for client-side errors
