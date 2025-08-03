import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Icon,
  Flex
} from '@chakra-ui/react';

import { FaCalculator } from 'react-icons/fa';
import { FiCpu, FiBarChart } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

/**
 * HomePage replicates the landing page of the Ishuri platform.  It contains
 * a hero section with a call to action and a feature summary grid.  For
 * illustrative purposes the background uses a linear gradient similar to
 * the original site.  Feel free to adjust the colours or content to your
 * needs.
 */
const HomePage = () => {
  return (
    <Box as="main" flex="1">
      {/* Hero section */}
      <Box
        bgGradient="linear(to-r, blueGradient.700, brand.600)"
        color="white"
        py={{ base: 16, md: 24 }}
        px={{ base: 4, sm: 6, lg: 8 }}
      >
        <Container maxW="6xl">
          <Stack direction={{ base: 'column', md: 'row' }} spacing={12} align="center">
            <Stack spacing={6} flex="1" textAlign={{ base: 'center', md: 'left' }}>
              <Heading
                as="h1"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Empowering Rwanda's Education with AI
              </Heading>
              <Text fontSize={{ base: 'lg', md: 'xl' }} opacity={0.9}>
                Access a suite of educational tools designed to help students, teachers
                and parents excel in the Rwandan education system.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} pt={4} justify={{ base: 'center', md: 'flex-start' }}>
                <Button as={RouterLink} to="/auth/register" colorScheme="whiteAlpha" bg="white" color="brand.700" _hover={{ bg: 'gray.100' }} size="lg">
                  Get Started
                </Button>
                <Button as={RouterLink} to="/apps" variant="outline" borderColor="white" color="white" _hover={{ bg: 'whiteAlpha.200' }} size="lg">
                  Explore Apps
                </Button>
              </Stack>
            </Stack>
            <Flex flex="1" justify="center" display={{ base: 'none', md: 'flex' }}>
              <Box maxW="md" w="full" boxShadow="lg" rounded="lg" overflow="hidden">
                {/* Illustration: You can replace this image URL with your own asset */}
                <img
                  src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1080"
                  alt="Students learning"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>
      {/* Feature section */}
      <Box bg="gray.50" py={{ base: 16, md: 20 }} px={{ base: 4, sm: 6, lg: 8 }}>
        <Container maxW="6xl">
          <Stack textAlign="center" mb={12} spacing={4}>
            <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="gray.900">
              Everything You Need in One Platform
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="3xl" mx="auto">
              From basic calculators to advanced AI‑powered learning tools, Ishuri Platform has everything to support education in Rwanda.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <Feature
              icon={FaCalculator}
              title="Free Educational Tools"
              text="Access basic educational tools like calculators, dictionaries and formula references at no cost."
            />
            <Feature
              icon={FiCpu}
              title="Advanced AI"
              text="Leverage AI assistants and problem solvers for personalised study support and interactive learning experiences."
            />
            <Feature
              icon={FiBarChart}
              title="Progress Analytics"
              text="Track your learning progress and identify areas for improvement with insightful analytics."
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};

// Helper component for the feature grid
const Feature = ({ icon, title, text }) => {
  return (
    <Stack bg="white" p={8} shadow="sm" borderWidth="1px" borderRadius="xl" align="flex-start">
      <Flex
        w={12}
        h={12}
        align="center"
        justify="center"
        color="brand.700"
        bg="brand.50"
        rounded="lg"
        mb={6}
      >
        <Icon as={icon} boxSize={6} />
      </Flex>
      <Heading as="h3" fontSize="xl" fontWeight="semibold" mb={3}>
        {title}
      </Heading>
      <Text color="gray.600" flex="1">
        {text}
      </Text>
    </Stack>
  );
};

export default HomePage;