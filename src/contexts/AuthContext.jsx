import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { getUserProfileWithSubscription, getUserSubscriptionDetails } from '../services/userService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Fetch user profile from database
          try {
            const profile = await getUserProfileWithSubscription();
            setUserProfile(profile);
            
            // Fetch subscription details separately
            try {
              const subscription = await getUserSubscriptionDetails();
              setUserSubscription(subscription);
            } catch (subError) {
              console.error('Error fetching subscription details:', subError);
              setUserSubscription(null);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          // Fetch user profile when user signs in
          try {
            const profile = await getUserProfileWithSubscription();
            setUserProfile(profile);
            
            // Fetch subscription details separately
            try {
              const subscription = await getUserSubscriptionDetails();
              setUserSubscription(subscription);
            } catch (subError) {
              console.error('Error fetching subscription details:', subError);
              setUserSubscription(null);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setUserProfile(null);
            // Don't block the user from continuing if profile fetch fails
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setUserSubscription(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      setUserSubscription(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateUserProfile = (newProfile) => {
    setUserProfile(newProfile);
  };

  const updateUserSubscription = (newSubscription) => {
    setUserSubscription(newSubscription);
  };

  const value = {
    user,
    userProfile,
    userSubscription,
    loading,
    signOut,
    updateUserProfile,
    updateUserSubscription,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
