import { supabase } from '../supabaseClient';

export const getUserProfile = async () => {
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
};

// Create user profile after registration
export const createUserProfile = async (profileData) => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error('No authenticated user found');

    // Validate required fields
    const requiredFields = ['fullName', 'username', 'dateOfBirth', 'school', 'level', 'userType', 'email', 'acceptTerms'];
    for (const field of requiredFields) {
      if (!profileData[field]) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate at least one phone number is provided
    if (!profileData.mtnPhone && !profileData.airtelPhone) {
      throw new Error('At least one phone number (MTN or AIRTEL) is required');
    }

    // Validate phone number formats
    const mtnPhoneRegex = /^(\+25078\d{7}|078\d{7}|\+25079\d{7}|079\d{7})$/;
    const airtelPhoneRegex = /^(\+25073\d{7}|073\d{7}|\+25075\d{7}|075\d{7})$/;
    
    if (profileData.mtnPhone && !mtnPhoneRegex.test(profileData.mtnPhone)) {
      throw new Error('Invalid MTN phone number format. Use 078XXXXXXX or 079XXXXXXX');
    }
    
    if (profileData.airtelPhone && !airtelPhoneRegex.test(profileData.airtelPhone)) {
      throw new Error('Invalid AIRTEL phone number format. Use 073XXXXXXX or 075XXXXXXX');
    }

    // Validate user type
    const validUserTypes = ['Student', 'Teacher', 'Parent'];
    if (!validUserTypes.includes(profileData.userType)) {
      throw new Error('Invalid user type. Must be Student, Teacher, or Parent');
    }

    // Validate accept terms
    if (!profileData.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    const { data, error } = await supabase
      .from('user_profile')
      .insert([
        {
          user_id: user.id,
          full_name: profileData.fullName,
          username: profileData.username,
          date_of_birth: profileData.dateOfBirth,
          school: profileData.school,
          level: profileData.level,
          user_type: profileData.userType,
          email: profileData.email,
          mtn_phone: profileData.mtnPhone || null,
          airtel_phone: profileData.airtelPhone || null,
          accept_terms: profileData.acceptTerms
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

// Get user profile from database
export const getUserProfileFromDB = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting authenticated user:', userError);
      throw userError;
    }
    
    if (!user) {
      throw new Error('No authenticated user found');
    }

    const { data, error } = await supabase
      .from('user_profile')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - user profile doesn't exist
        throw new Error('User profile not found. Please complete your profile setup.');
      }
      console.error('Database error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Get user profile with subscription details
export const getUserProfileWithSubscription = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error('No authenticated user found');

    const { data, error } = await supabase
      .from('user_subscription_details')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      // If no subscription details found, fall back to basic profile
      console.warn('No subscription details found, fetching basic profile');
      return await getUserProfileFromDB();
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user profile with subscription:', error);
    // Fall back to basic profile if subscription view fails
    try {
      return await getUserProfileFromDB();
    } catch (fallbackError) {
      console.error('Error fetching fallback profile:', fallbackError);
      throw error;
    }
  }
};

// Get user subscription details only
export const getUserSubscriptionDetails = async () => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error('No authenticated user found');

    const { data, error } = await supabase
      .from('user_subscription_details')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      // Return null if no subscription found (user might be on free plan)
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user subscription details:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error('No authenticated user found');

    // Remove fields that shouldn't be updated
    const { user_id, id, created_at, ...updateData } = profileData;

    const { data, error } = await supabase
      .from('user_profile')
      .update(updateData)
      .eq('user_id', user.id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Check if username is available
export const checkUsernameAvailability = async (username) => {
  try {
    const { data, error } = await supabase
      .from('user_profile')
      .select('username')
      .eq('username', username);

    if (error) throw error;
    return data.length === 0; // Return true if username is available
  } catch (error) {
    console.error('Error checking username availability:', error);
    throw error;
  }
};

// Check if phone number is available
export const checkPhoneAvailability = async (phoneNumber, phoneType) => {
  try {
    const column = phoneType === 'mtn' ? 'mtn_phone' : 'airtel_phone';
    const { data, error } = await supabase
      .from('user_profile')
      .select(column)
      .eq(column, phoneNumber);

    if (error) throw error;
    return data.length === 0; // Return true if phone number is available
  } catch (error) {
    console.error('Error checking phone availability:', error);
    throw error;
  }
};
