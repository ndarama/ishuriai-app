import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Icon,
  Button
} from '@chakra-ui/react';
import { MdEmail } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

const EmailConfirmationPage = () => {
  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }} minH="70vh" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md" w="full">
        <VStack spacing={6} textAlign="center">
          <Icon as={MdEmail} boxSize={16} color="blue.500" />
          
          <Heading fontSize="2xl" fontWeight="bold" color="gray.800">
            Check Your Email
          </Heading>
          
          <Text color="gray.600" fontSize="lg">
            We've sent you a confirmation email. Please click the link in the email to verify your account.
          </Text>
          
          <Text fontSize="sm" color="gray.500">
            Didn't receive the email? Check your spam folder or contact support.
          </Text>
          
          <Button 
            as={RouterLink} 
            to="/auth/login" 
            colorScheme="blue" 
            size="lg"
            mt={4}
          >
            Go to Login
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default EmailConfirmationPage;
