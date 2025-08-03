import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Heading,
  Code,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { testDatabaseConnection, testProfileCreation } from './databaseTest';
import { signUpWithProfile } from '../services/authService';
import { supabase } from '../supabaseClient';

const DatabaseTestComponent = () => {
  const [testResults, setTestResults] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const addResult = (message) => {
    setTestResults(prev => prev + message + '\n');
  };

  const testConnection = async () => {
    setLoading(true);
    setTestResults('');
    
    addResult('=== Testing Database Connection ===');
    
    const result = await testDatabaseConnection();
    
    if (result.success) {
      addResult('✅ ' + result.message);
    } else {
      addResult('❌ ' + result.message);
    }
    
    setLoading(false);
  };

  const testFullRegistration = async () => {
    setLoading(true);
    setTestResults('');
    
    addResult('=== Testing Full Registration Process ===');
    
    // Test data
    const testEmail = `test_${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    const profileData = {
      fullName: 'Test User',
      username: `testuser_${Date.now()}`,
      dateOfBirth: '1995-05-15',
      school: 'Test University',
      level: 'University Year 2',
      userType: 'Student',
      acceptTerms: true
    };

    try {
      addResult(`Testing with email: ${testEmail}`);
      addResult('Profile data: ' + JSON.stringify(profileData, null, 2));
      
      const result = await signUpWithProfile({
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
        profileData: {
          ...profileData,
          email: testEmail
        }
      });
      
      if (result.user) {
        addResult('✅ User authentication successful');
        addResult(`User ID: ${result.user.id}`);
        
        if (result.profile) {
          addResult('✅ Profile created successfully');
          addResult('Profile data: ' + JSON.stringify(result.profile, null, 2));
        } else if (result.needsEmailConfirmation) {
          addResult('⚠️ Email confirmation required');
        }
        
        // Clean up - delete the test user
        addResult('Cleaning up test user...');
        await supabase.auth.admin.deleteUser(result.user.id);
        addResult('✅ Test user cleaned up');
        
      } else {
        addResult('❌ User creation failed');
      }
      
    } catch (error) {
      addResult('❌ Registration test failed: ' + error.message);
    }
    
    setLoading(false);
  };

  const checkSupabaseConfig = () => {
    setTestResults('');
    addResult('=== Checking Supabase Configuration ===');
    
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    addResult(`Supabase URL: ${url ? '✅ Present' : '❌ Missing'}`);
    addResult(`Supabase Key: ${key ? '✅ Present' : '❌ Missing'}`);
    
    if (url) addResult(`URL: ${url}`);
    if (key) addResult(`Key: ${key.substring(0, 20)}...`);
  };

  const testProfileQuery = async () => {
    setLoading(true);
    setTestResults('');
    
    addResult('=== Testing Profile Table Query ===');
    
    try {
      // Test if we can query the table structure
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .limit(0);
      
      if (error) {
        addResult('❌ Query failed: ' + error.message);
        if (error.message.includes('relation "public.user_profile" does not exist')) {
          addResult('');
          addResult('🔧 SOLUTION: Execute the SQL setup script in Supabase:');
          addResult('1. Go to your Supabase dashboard');
          addResult('2. Navigate to SQL Editor');
          addResult('3. Copy and execute the content from setup_database.sql');
        }
      } else {
        addResult('✅ user_profile table is accessible');
        addResult('✅ Table structure is correct');
      }
    } catch (error) {
      addResult('❌ Query test failed: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <Box p={6} maxW="4xl" mx="auto">
      <VStack spacing={6}>
        <Heading size="lg" color="blue.600">
          Database & Registration Testing
        </Heading>
        
        <Text color="gray.600">
          Use these tools to test your database setup and registration process.
        </Text>
        
        <VStack spacing={3} w="full">
          <Button onClick={checkSupabaseConfig} colorScheme="blue" w="full">
            Check Supabase Configuration
          </Button>
          
          <Button onClick={testProfileQuery} colorScheme="green" w="full" isLoading={loading}>
            Test Profile Table Access
          </Button>
          
          <Button onClick={testConnection} colorScheme="purple" w="full" isLoading={loading}>
            Test Database Connection
          </Button>
          
          <Button onClick={testFullRegistration} colorScheme="orange" w="full" isLoading={loading}>
            Test Full Registration Process
          </Button>
        </VStack>
        
        {testResults && (
          <Box w="full">
            <Text fontWeight="bold" mb={2}>Test Results:</Text>
            <Textarea
              value={testResults}
              readOnly
              h="400px"
              fontFamily="monospace"
              fontSize="sm"
              bg="gray.50"
            />
          </Box>
        )}
        
        <Alert status="info">
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Setup Instructions:</Text>
            <Text fontSize="sm">
              1. Execute setup_database.sql in your Supabase SQL Editor<br/>
              2. Run "Test Profile Table Access" to verify setup<br/>
              3. Test the full registration process
            </Text>
          </Box>
        </Alert>
      </VStack>
    </Box>
  );
};

export default DatabaseTestComponent;
