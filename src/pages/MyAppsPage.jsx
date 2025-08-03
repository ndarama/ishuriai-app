import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const MyAppsPage = () => {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>My Apps</Heading>
            <Text color="gray.600">Your personalized learning applications</Text>
          </Box>
          
          <Box p={8} textAlign="center">
            <Text color="gray.500">My Apps page content coming soon...</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default MyAppsPage;
