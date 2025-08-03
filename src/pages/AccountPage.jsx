import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const AccountPage = () => {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Account Settings</Heading>
            <Text color="gray.600">Manage your account security and preferences</Text>
          </Box>
          
          <Box p={8} textAlign="center">
            <Text color="gray.500">Account settings page content coming soon...</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AccountPage;
