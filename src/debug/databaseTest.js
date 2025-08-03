import { supabase } from '../supabaseClient';

// Test database connection and user_profile table
export const testDatabaseConnection = async () => {
  try {
    console.log('Testing database connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('user_profile').select('count').limit(1);
    
    if (error) {
      if (error.message.includes('relation "public.user_profile" does not exist')) {
        console.error('❌ user_profile table does not exist. Please run the SQL setup script.');
        return {
          success: false,
          message: 'user_profile table not found. Please execute setup_database.sql in Supabase.'
        };
      }
      console.error('❌ Database connection error:', error);
      return {
        success: false,
        message: error.message
      };
    }
    
    console.log('✅ Database connection successful');
    console.log('✅ user_profile table exists');
    
    return {
      success: true,
      message: 'Database connection and table verified'
    };
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Test user profile creation
export const testProfileCreation = async (testData) => {
  try {
    console.log('Testing profile creation...');
    
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: 'No authenticated user found for testing'
      };
    }

    const { data, error } = await supabase
      .from('user_profile')
      .insert([
        {
          user_id: user.id,
          full_name: testData.fullName || 'Test User',
          username: testData.username || `testuser_${Date.now()}`,
          date_of_birth: testData.dateOfBirth || '1990-01-01',
          school: testData.school || 'Test School',
          level: testData.level || 'University Year 1',
          user_type: testData.userType || 'Student',
          email: testData.email || user.email,
          accept_terms: testData.acceptTerms || true
        }
      ])
      .select();

    if (error) {
      console.error('❌ Profile creation failed:', error);
      return {
        success: false,
        message: error.message
      };
    }

    console.log('✅ Profile created successfully:', data[0]);
    
    return {
      success: true,
      message: 'Profile creation test successful',
      data: data[0]
    };
    
  } catch (error) {
    console.error('❌ Profile creation test failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
};
