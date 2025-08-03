import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SmartNavbar from './components/SmartNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AppsPage from './pages/AppsPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AppDetailsPage from './pages/AppDetailsPage';
import EmailConfirmationPage from './pages/EmailConfirmationPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import DatabaseTestComponent from './debug/DatabaseTestComponent';
// Private pages
import DashboardPage from './pages/DashboardPage';
import MyAppsPage from './pages/MyAppsPage';
import CommunityPage from './pages/CommunityPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import AccountPage from './pages/AccountPage';
import BillingPage from './pages/BillingPage';
import CalculatorPage from './pages/CalculatorPage';

/**
 * The top‑level App component registers all of the routes used in the
 * application and displays a persistent navigation bar across pages.  To
 * add new pages simply import your component above and add another
 * <Route> below.
 */
const App = () => {
  return (
    <>
      <SmartNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/apps/:slug" element={<AppDetailsPage />} />
        <Route path="/app/ishuri-calculator" element={<CalculatorPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/confirm-email" element={<EmailConfirmationPage />} />
        <Route path="/complete-profile" element={<ProtectedRoute><CompleteProfilePage /></ProtectedRoute>} />
        <Route path="/debug/database" element={<DatabaseTestComponent />} />
        {/* Private routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/my-apps" element={<ProtectedRoute><MyAppsPage /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;