import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  VStack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Complete Profile Page - for users who need to set up their profile
 */
const CompleteProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCompleteProfile = () => {
    navigate('/auth/register', { 
      state: { 
        email: user?.email,
        isProfileCompletion: true 
      } 
    });
  };

  const handleSkipForNow = () => {
    navigate('/dashboard');
  };

  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }} minH="70vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" w="full">
        <VStack spacing={6}>
          <Heading textAlign="center" fontSize="2xl" fontWeight="bold">
            Complete Your Profile
          </Heading>
          
          <Alert status="info">
            <AlertIcon />
            To get the most out of your experience, please complete your profile setup.
          </Alert>
          
          <Text textAlign="center" color="gray.600">
            Your account has been created successfully! To access all features and get personalized content, 
            please take a moment to complete your profile.
          </Text>
          
          <VStack spacing={4} w="full">
            <Button 
              colorScheme="brand" 
              size="lg" 
              w="full"
              onClick={handleCompleteProfile}
            >
              Complete Profile Now
            </Button>
            
            <Button 
              variant="link" 
              colorScheme="gray" 
              onClick={handleSkipForNow}
            >
              Skip for now (limited features)
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default CompleteProfilePage;
