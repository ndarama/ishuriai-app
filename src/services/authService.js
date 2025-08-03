import { supabase } from '../supabaseClient';
import { createUserProfile } from './userService';

export const signUp = async ({ email, password }) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    console.log('Attempting signup for:', email);
    
    // Simple signup without redirect options that might cause issues
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password
    });
    
    console.log('Signup response:', { data, error });
    
    if (error) {
      console.error('Supabase signup error:', error);
      
      // Handle specific Supabase errors
      if (error.status === 400) {
        if (error.message.includes('already registered') || error.message.includes('already been registered')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        if (error.message.includes('invalid')) {
          throw new Error('Invalid email format or password requirements not met.');
        }
        throw new Error(error.message);
      } else if (error.status === 422) {
        throw new Error('Invalid email format or password requirements not met.');
      } else if (error.status === 500) {
        // For 500 errors, provide more specific guidance
        throw new Error('Server error occurred. This might be due to Supabase configuration. Please check your project settings.');
      } else {
        throw new Error(error.message || 'Signup failed');
      }
    }
    
    return data;
  } catch (error) {
    console.error('SignUp error:', error);
    throw error;
  }
};

// Complete registration with profile creation
export const signUpWithProfile = async ({ email, password, confirmPassword, profileData }) => {
  try {
    // Validate passwords match
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Validate profile data
    if (!profileData.acceptTerms) {
      throw new Error('You must accept the terms and conditions');
    }

    console.log('Attempting signup with profile for:', email);
    
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          // Store profile data in user metadata temporarily
          full_name: profileData.fullName,
          username: profileData.username,
          date_of_birth: profileData.dateOfBirth,
          school: profileData.school,
          level: profileData.level,
          user_type: profileData.userType,
          accept_terms: profileData.acceptTerms
        }
      }
    });
    
    if (authError) {
      console.error('Supabase signup error:', authError);
      
      // Handle specific Supabase errors
      if (authError.status === 400) {
        if (authError.message.includes('already registered') || authError.message.includes('already been registered')) {
          throw new Error('An account with this email already exists. Please try logging in instead.');
        }
        if (authError.message.includes('invalid')) {
          throw new Error('Invalid email format or password requirements not met.');
        }
        throw new Error(authError.message);
      } else if (authError.status === 422) {
        throw new Error('Invalid email format or password requirements not met.');
      } else if (authError.status === 500) {
        throw new Error('Server error occurred. This might be due to Supabase configuration. Please check your project settings.');
      } else {
        throw new Error(authError.message || 'Signup failed');
      }
    }

    console.log('Auth user created:', authData.user);

    // Try to create profile immediately (works if email confirmation is disabled)
    // or if the user is auto-confirmed
    if (authData.user) {
      try {
        // Check if user is immediately confirmed or if we should create profile anyway
        const shouldCreateProfile = authData.user.email_confirmed_at || 
                                   !authData.user.confirmation_sent_at ||
                                   authData.session; // User is logged in immediately

        if (shouldCreateProfile) {
          console.log('Creating profile immediately...');
          const profile = await createUserProfile({
            ...profileData,
            email: email
          });
          
          console.log('Profile created successfully:', profile);
          
          return {
            user: authData.user,
            profile: profile,
            session: authData.session,
            profileCreated: true
          };
        } else {
          console.log('Email confirmation required - profile will be created after confirmation');
          // Profile will be created after email confirmation via webhook or login
          return {
            user: authData.user,
            session: authData.session,
            needsEmailConfirmation: true,
            profileCreated: false,
            profileData: profileData // Return profile data for later use
          };
        }
      } catch (profileError) {
        console.error('Profile creation error:', profileError);
        
        // Don't fail the entire registration if profile creation fails
        // The user can complete their profile later
        console.log('Profile creation failed, but user account was created');
        
        return {
          user: authData.user,
          session: authData.session,
          needsEmailConfirmation: !authData.user?.email_confirmed_at,
          profileCreated: false,
          profileError: profileError.message,
          profileData: profileData
        };
      }
    }
    
    throw new Error('User creation failed - no user data returned');
    
  } catch (error) {
    console.error('SignUp with profile error:', error);
    throw error;
  }
};

// Create profile after email confirmation or login
export const createProfileAfterConfirmation = async (profileData) => {
  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('No authenticated user found');
    }

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from('user_profile')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (existingProfile) {
      console.log('Profile already exists for user');
      return existingProfile;
    }

    // Create profile from stored data or provided data
    const dataToUse = profileData || user.user_metadata;
    
    if (!dataToUse) {
      throw new Error('No profile data available');
    }

    const profile = await createUserProfile({
      fullName: dataToUse.full_name || dataToUse.fullName,
      username: dataToUse.username,
      dateOfBirth: dataToUse.date_of_birth || dataToUse.dateOfBirth,
      school: dataToUse.school,
      level: dataToUse.level,
      userType: dataToUse.user_type || dataToUse.userType,
      email: user.email,
      acceptTerms: dataToUse.accept_terms || dataToUse.acceptTerms
    });

    console.log('Profile created after confirmation:', profile);
    return profile;
    
  } catch (error) {
    console.error('Error creating profile after confirmation:', error);
    throw error;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Supabase signIn error:', error);
      
      switch (error.status) {
        case 400:
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          }
          if (error.message.includes('Email not confirmed')) {
            throw new Error('Please check your email and click the confirmation link before signing in.');
          }
          throw new Error('Invalid email or password.');
        case 422:
          throw new Error('Invalid email format.');
        case 500:
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(error.message || 'Login failed. Please try again.');
      }
    }
    
    return data;
  } catch (error) {
    console.error('SignIn error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('SignOut error:', error);
    throw error;
  }
};

/**
 * Send password reset email to user
 * @param {string} email - User's email address
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    
    if (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  } catch (error) {
    console.error('ResetPassword error:', error);
    throw error;
  }
};
