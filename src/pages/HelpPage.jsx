import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const HelpPage = () => {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Help & Support</Heading>
            <Text color="gray.600">Get help and find answers to your questions</Text>
          </Box>
          
          <Box p={8} textAlign="center">
            <Text color="gray.500">Help page content coming soon...</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HelpPage;
