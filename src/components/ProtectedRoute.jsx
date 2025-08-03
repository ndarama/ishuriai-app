import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.500" />
      </Center>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
