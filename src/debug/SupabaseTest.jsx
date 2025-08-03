import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [authStatus, setAuthStatus] = useState('Not tested');
  const [error, setError] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test basic connection
      const { data, error } = await supabase.from('_realtime').select('*').limit(1);
      if (error) {
        setConnectionStatus(`Connection Error: ${error.message}`);
      } else {
        setConnectionStatus('Connection successful');
      }
    } catch (err) {
      setConnectionStatus(`Network Error: ${err.message}`);
    }
  };

  const testAuth = async () => {
    setError('');
    setAuthStatus('Testing...');
    
    try {
      // Test with a dummy user
      const testEmail = 'test@example.com';
      const testPassword = 'testpassword123';
      
      const { data, error } = await supabase.auth.signUp({ 
        email: testEmail, 
        password: testPassword 
      });
      
      if (error) {
        setAuthStatus(`Auth Error: ${error.message}`);
        setError(error.message);
      } else {
        setAuthStatus('Auth test successful');
        console.log('Auth test data:', data);
      }
    } catch (err) {
      setAuthStatus(`Auth Network Error: ${err.message}`);
      setError(err.message);
    }
  };

  return (
    <Box p={6} maxW="md" mx="auto">
      <VStack spacing={4}>
        <Text fontSize="xl" fontWeight="bold">Supabase Connection Test</Text>
        
        <Alert status={connectionStatus.includes('successful') ? 'success' : 'error'}>
          <AlertIcon />
          {connectionStatus}
        </Alert>
        
        <Button onClick={testAuth} colorScheme="blue">
          Test Auth (Sign Up)
        </Button>
        
        <Alert status={authStatus.includes('successful') ? 'success' : 'error'}>
          <AlertIcon />
          {authStatus}
        </Alert>
        
        {error && (
          <Text color="red.500" fontSize="sm">
            Detailed Error: {error}
          </Text>
        )}
        
        <Text fontSize="sm" color="gray.600">
          Environment Variables:
          <br />
          URL: {import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Missing'}
          <br />
          Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing'}
        </Text>
      </VStack>
    </Box>
  );
};

export default SupabaseTest;
