import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Button,
  Image,
  HStack,
  VStack,
  SimpleGrid,
  useBreakpointValue,
  Link
} from '@chakra-ui/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ProfileRegistrationForm from '../components/ProfileRegistrationForm';

/**
 * RegisterPage allows new users to create an account with complete profile information.
 * Uses the new ProfileRegistrationForm component for comprehensive user registration.
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleRegistrationSuccess = (result) => {
    console.log('Registration successful:', result);
    
    if (result.needsEmailConfirmation) {
      // Redirect to a confirmation page or show message
      navigate('/auth/confirm-email');
    } else {
      // User is ready to use the app
      navigate('/apps');
    }
  };

  const handleCancel = () => {
    navigate('/auth/login');
  };

  const AppStoreBadge = ({ platform, url, src }) => (
    <Link href={url} isExternal>
      <Image
        src={src}
        alt={`Download on ${platform}`}
        h="40px"
        w="auto"
        cursor="pointer"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
      />
    </Link>
  );

  return (
    <Box as="main" py={8} px={{ base: 4, sm: 6, lg: 8 }} minH="100vh" 
         bgGradient="linear(135deg, brand.50 0%, blue.50 100%)">
      <Container maxW="7xl" w="full">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="start">
          {/* Left side - Branding and Visual (Desktop) */}
          {!isMobile && (
            <VStack spacing={8} textAlign="center" position="sticky" top="8">
              <Image 
                src="/logo.svg" 
                alt="Ishuri Logo" 
                h="80px" 
                w="auto"
                filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
              />
              <Box>
                <Heading fontSize="4xl" fontWeight="bold" color="brand.700" mb={4}>
                  Join Ishuri Today
                </Heading>
                <Text fontSize="xl" color="gray.600" mb={8} maxW="400px">
                  Create your account and unlock personalized learning tools designed for academic success
                </Text>
              </Box>
              
              {/* Feature highlights */}
              <VStack spacing={6} align="start" maxW="400px">
                <HStack spacing={4}>
                  <Box w="50px" h="50px" bg="brand.400" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                    <Text color="white" fontSize="xl" fontWeight="bold">📚</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="semibold" color="brand.700">Personalized Learning</Text>
                    <Text fontSize="sm" color="gray.600">Tailored content for your academic needs</Text>
                  </Box>
                </HStack>
                
                <HStack spacing={4}>
                  <Box w="50px" h="50px" bg="brand.400" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                    <Text color="white" fontSize="xl" fontWeight="bold">🎯</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="semibold" color="brand.700">Track Progress</Text>
                    <Text fontSize="sm" color="gray.600">Monitor your learning journey</Text>
                  </Box>
                </HStack>
                
                <HStack spacing={4}>
                  <Box w="50px" h="50px" bg="brand.400" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                    <Text color="white" fontSize="xl" fontWeight="bold">🌟</Text>
                  </Box>
                  <Box textAlign="left">
                    <Text fontWeight="semibold" color="brand.700">Expert Resources</Text>
                    <Text fontSize="sm" color="gray.600">Access curated educational content</Text>
                  </Box>
                </HStack>
              </VStack>

              {/* Feature showcase illustration */}
              <Image
                src="/register-illustration.svg"
                alt="Personalized Learning Experience"
                w="400px"
                h="300px"
                maxW="100%"
                borderRadius="xl"
                shadow="lg"
                mb={6}
              />

              {/* App Store Badges */}
              <VStack spacing={4} pt={6}>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Download our mobile app
                </Text>
                <HStack spacing={4}>
                  <AppStoreBadge
                    platform="App Store"
                    url="https://apps.apple.com"
                    src="/app-store-badge.svg"
                  />
                  <AppStoreBadge
                    platform="Google Play"
                    url="https://play.google.com/store"
                    src="/google-play-badge.svg"
                  />
                </HStack>
              </VStack>
            </VStack>
          )}

          {/* Right side - Registration Form */}
          <Box>
            {/* Mobile header */}
            {isMobile && (
              <VStack spacing={6} mb={8} textAlign="center">
                <Image 
                  src="/logo.svg" 
                  alt="Ishuri Logo" 
                  h="60px" 
                  w="auto"
                  filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                />
                <Heading fontSize="3xl" fontWeight="bold" color="brand.700">
                  Join Ishuri Platform
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  Create your account to unlock personalised learning tools
                </Text>
              </VStack>
            )}

            {/* Desktop header */}
            {!isMobile && (
              <Stack spacing={6} mb={8}>
                <Heading textAlign="center" fontSize="3xl" fontWeight="bold" color="brand.700">
                  Create Your Account
                </Heading>
                <Text textAlign="center" color="gray.600" fontSize="lg">
                  Fill in your details to get started with personalized learning
                </Text>
              </Stack>
            )}
            
            <Box 
              bg="white" 
              borderRadius="xl" 
              shadow="xl" 
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
            >
              <ProfileRegistrationForm
                onSuccess={handleRegistrationSuccess}
                onCancel={handleCancel}
              />
            </Box>
            
            <Box mt={8}>
              <Text textAlign="center" fontSize="sm" color="gray.600">
                Already have an account?{' '}
                <Button variant="link" as={RouterLink} to="/auth/login" colorScheme="brand" size="sm" fontWeight="semibold">
                  Log in here
                </Button>
              </Text>
            </Box>

            {/* Mobile App Store Badges */}
            {isMobile && (
              <VStack spacing={4} pt={8}>
                <Text fontSize="sm" color="gray.600" fontWeight="medium">
                  Download our mobile app
                </Text>
                <HStack spacing={3}>
                  <AppStoreBadge
                    platform="App Store"
                    url="https://apps.apple.com"
                    src="/app-store-badge.svg"
                  />
                  <AppStoreBadge
                    platform="Google Play"
                    url="https://play.google.com/store"
                    src="/google-play-badge.svg"
                  />
                </HStack>
              </VStack>
            )}
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default RegisterPage;