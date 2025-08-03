import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';
import PrivateNavbar from './PrivateNavbar';
import AppNavbar from './AppNavbar';

const SmartNavbar = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show nothing while loading to prevent flicker
  if (loading) {
    return null;
  }

  // Check if we're on an app page
  const isAppPage = location.pathname.startsWith('/app/');

  // If we're on an app page, show AppNavbar
  if (isAppPage) {
    // Extract app name from path for customization
    const appPath = location.pathname.split('/app/')[1];
    
    // Get user plan information (you can extend this logic based on your user data structure)
    const userPlan = user?.subscription?.plan || "Free Plan";
    
    // Configure AppNavbar based on the specific app
    if (appPath === 'ishuri-calculator') {
      return (
        <AppNavbar 
          appName="Ishuri Calculator" 
          appDescription="A powerful and versatile calculator for all your needs."
          userPlan={userPlan}
          showBackButton={true}
          backTo={isAuthenticated ? "/my-apps" : "/apps"}
        />
      );
    }
    
    if (appPath === 'ishuri-dictionary') {
      return (
        <AppNavbar 
          appName="Ishuri Dictionary" 
          appDescription="Comprehensive multilingual dictionary with Kinyarwanda, French, English, and Swahili translations."
          userPlan={userPlan}
          showBackButton={true}
          backTo={isAuthenticated ? "/my-apps" : "/apps"}
        />
      );
    }
    
    if (appPath === 'ishuri-ai-assistant') {
      return (
        <AppNavbar 
          appName="Ishuri AI Assistant" 
          appDescription="AI-powered learning assistant for all subjects with personalized support."
          userPlan={userPlan}
          showBackButton={true}
          backTo={isAuthenticated ? "/my-apps" : "/apps"}
        />
      );
    }
    
    // Default AppNavbar for other apps
    return (
      <AppNavbar 
        appName="Ishuri App" 
        appDescription="Ishuri application"
        userPlan={userPlan}
        showBackButton={true}
        backTo={isAuthenticated ? "/my-apps" : "/apps"}
      />
    );
  }

  // Return appropriate navbar based on authentication status
  return isAuthenticated ? <PrivateNavbar /> : <Navbar />;
};

export default SmartNavbar;
