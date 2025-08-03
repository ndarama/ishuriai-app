import React from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const CommunityPage = () => {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Community</Heading>
            <Text color="gray.600">Connect with other learners and educators</Text>
          </Box>
          
          <Box p={8} textAlign="center">
            <Text color="gray.500">Community page content coming soon...</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default CommunityPage;
