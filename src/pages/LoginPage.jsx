import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  useToast,
  Link,
  Image,
  HStack,
  VStack,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react';
import { signIn, resetPassword } from '../services/authService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

/**
 * LoginPage provides a form for users to sign into their account
 * using username/email and password, with forgot password functionality.
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  // Helper function to check if input is email or username
  const isEmail = (input) => {
    return input.includes('@');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate email format
      if (!isEmail(email)) {
        throw new Error('Please enter a valid email address.');
      }
      
      const result = await signIn({ email, password });
      console.log('Login successful:', result);
      
      // Simply navigate to dashboard - let AuthContext handle profile loading
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }

    if (!isEmail(email)) {
      setError('Please enter a valid email address to reset your password.');
      return;
    }

    setResetLoading(true);
    setError('');

    try {
      await resetPassword(email);
      toast({
        title: 'Password Reset Email Sent',
        description: 'Check your email for password reset instructions.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const isMobile = useBreakpointValue({ base: true, lg: false });

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
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }} minH="100vh" 
         bgGradient="linear(135deg, brand.50 0%, blue.50 100%)" 
         display="flex" alignItems="center" justifyContent="center">
      <Container maxW="6xl" w="full">
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
          {/* Left side - Branding and Visual */}
          {!isMobile && (
            <VStack spacing={8} textAlign="center">
              <Image 
                src="/logo.svg" 
                alt="Ishuri Logo" 
                h="80px" 
                w="auto"
                filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
              />
              <Box>
                <Heading fontSize="4xl" fontWeight="bold" color="brand.700" mb={4}>
                  Welcome to Ishuri
                </Heading>
                <Text fontSize="xl" color="gray.600" mb={8}>
                  Your gateway to personalized learning and academic excellence
                </Text>
              </Box>
              
              {/* Illustration */}
              <Image
                src="/learning-illustration.svg"
                alt="Learning Journey Illustration"
                w="300px"
                h="200px"
                borderRadius="xl"
                shadow="lg"
              />

              {/* App Store Badges */}
              <VStack spacing={4}>
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

          {/* Right side - Login Form */}
          <Box>
            <Stack spacing={6}>
              {/* Mobile logo */}
              {isMobile && (
                <VStack spacing={4} mb={6}>
                  <Image 
                    src="/logo.svg" 
                    alt="Ishuri Logo" 
                    h="60px" 
                    w="auto"
                    filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                  />
                </VStack>
              )}
              
              <Heading textAlign="center" fontSize="2xl" fontWeight="bold" color="brand.700">
                Welcome back
              </Heading>
              <Text textAlign="center" color="gray.600">
                Sign in to continue your learning journey
              </Text>
              
              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              
              <Box 
                as="form" 
                onSubmit={handleLogin} 
                bg="white" 
                p={8} 
                borderWidth="1px" 
                borderColor="gray.200" 
                rounded="xl" 
                shadow="xl"
                backdropFilter="blur(10px)"
              >
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">Email Address</FormLabel>
                    <Input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="you@example.com"
                      size="lg"
                      borderColor="gray.300"
                      _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color="gray.700" fontWeight="medium">Password</FormLabel>
                    <Input 
                      type="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="********"
                      size="lg"
                      borderColor="gray.300"
                      _focus={{ borderColor: "brand.500", boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)" }}
                    />
                  </FormControl>
                  <Stack spacing={4}>
                    <Button 
                      type="submit" 
                      colorScheme="brand" 
                      isLoading={loading} 
                      loadingText="Signing in..." 
                      w="full"
                      size="lg"
                      fontWeight="semibold"
                      _hover={{ transform: 'translateY(-1px)', shadow: 'lg' }}
                    >
                      Sign In
                    </Button>
                    <Link 
                      color="brand.500" 
                      fontSize="sm" 
                      textAlign="center" 
                      cursor="pointer"
                      onClick={handleForgotPassword}
                      isDisabled={resetLoading}
                      _hover={{ textDecoration: 'underline', color: 'brand.600' }}
                      fontWeight="medium"
                    >
                      {resetLoading ? 'Sending reset email...' : 'Forgot your password?'}
                    </Link>
                  </Stack>
                </Stack>
              </Box>
              
              <Text textAlign="center" fontSize="sm" color="gray.600">
                Don't have an account?{' '}
                <Button variant="link" as={RouterLink} to="/auth/register" colorScheme="brand" size="sm" fontWeight="semibold">
                  Sign up
                </Button>
              </Text>

              {/* Mobile App Store Badges */}
              {isMobile && (
                <VStack spacing={4} pt={6}>
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
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default LoginPage;