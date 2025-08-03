import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  Card, 
  CardBody, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  VStack, 
  HStack, 
  Badge, 
  Progress,
  Alert,
  AlertIcon,
  Button
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { userProfile, user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Apps Used', value: '12', helpText: 'This month' },
    { label: 'Study Hours', value: '24.5', helpText: 'This week' },
    { label: 'Achievements', value: '8', helpText: 'Unlocked' },
    { label: 'Progress', value: '75%', helpText: 'Overall completion' }
  ];

  // Show profile completion notice if no profile
  if (!userProfile) {
    return (
      <Box minH="calc(100vh - 64px)" bg="gray.50">
        <Container maxW="7xl" py={8}>
          <VStack spacing={6}>
            <Heading size="lg">Welcome to Your Dashboard!</Heading>
            
            <Alert status="warning" maxW="md">
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Profile Setup Required</Text>
                <Text fontSize="sm">Complete your profile to access all features and get personalized content.</Text>
              </Box>
            </Alert>
            
            <Button 
              colorScheme="brand" 
              size="lg"
              onClick={() => navigate('/complete-profile')}
            >
              Complete Your Profile
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Welcome Header */}
          <Box>
            <Heading size="lg" mb={2}>
              Welcome back, {userProfile?.full_name || user?.email || 'Student'}!
            </Heading>
            <HStack spacing={2}>
              <Text color="gray.600">Current Plan:</Text>
              <Badge colorScheme="brand" size="sm">
                {userProfile?.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </HStack>
          </Box>

          {/* Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardBody>
                  <Stat>
                    <StatLabel>{stat.label}</StatLabel>
                    <StatNumber>{stat.value}</StatNumber>
                    <StatHelpText>{stat.helpText}</StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          {/* Recent Activity */}
          <Card>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Heading size="md">Recent Activity</Heading>
                <VStack spacing={3} align="stretch">
                  <Box p={4} bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <Text>Completed Math Practice App</Text>
                      <Text fontSize="sm" color="gray.500">2 hours ago</Text>
                    </HStack>
                  </Box>
                  <Box p={4} bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <Text>Started Science Quiz Challenge</Text>
                      <Text fontSize="sm" color="gray.500">5 hours ago</Text>
                    </HStack>
                  </Box>
                  <Box p={4} bg="gray.50" borderRadius="md">
                    <HStack justify="space-between">
                      <Text>Earned "Quick Learner" badge</Text>
                      <Text fontSize="sm" color="gray.500">1 day ago</Text>
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Progress Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Learning Progress</Heading>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text>Mathematics</Text>
                      <Text fontSize="sm" color="gray.500">85%</Text>
                    </HStack>
                    <Progress colorScheme="brand" value={85} />
                  </Box>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text>Science</Text>
                      <Text fontSize="sm" color="gray.500">72%</Text>
                    </HStack>
                    <Progress colorScheme="brand" value={72} />
                  </Box>
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text>English</Text>
                      <Text fontSize="sm" color="gray.500">91%</Text>
                    </HStack>
                    <Progress colorScheme="brand" value={91} />
                  </Box>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <Heading size="md">Quick Actions</Heading>
                  <Text color="gray.600">Continue your learning journey with these recommended activities.</Text>
                  <VStack spacing={2} align="stretch">
                    <Box p={3} bg="brand.50" borderRadius="md" border="1px" borderColor="brand.200">
                      <Text fontWeight="medium" color="brand.700">Practice Math Problems</Text>
                      <Text fontSize="sm" color="brand.600">10 minutes</Text>
                    </Box>
                    <Box p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                      <Text fontWeight="medium" color="blue.700">Review Science Notes</Text>
                      <Text fontSize="sm" color="blue.600">15 minutes</Text>
                    </Box>
                    <Box p={3} bg="purple.50" borderRadius="md" border="1px" borderColor="purple.200">
                      <Text fontWeight="medium" color="purple.700">Complete Reading Assignment</Text>
                      <Text fontSize="sm" color="purple.600">20 minutes</Text>
                    </Box>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default DashboardPage;
