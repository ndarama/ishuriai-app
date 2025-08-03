import React from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Flex,
  Button,
  Icon,
  Badge
} from '@chakra-ui/react';
import { appsData } from '../data/apps';

/**
 * AppDetailsPage displays detailed information about a single application.
 * The app is identified by its slug via the route parameter.  If a slug
 * does not match any known app the user is redirected back to the Apps
 * page.  You can customise the content here to more closely mimic the
 * functionality of each individual app.
 */
const AppDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const app = appsData.find((a) => a.slug === slug);

  React.useEffect(() => {
    if (!app) {
      navigate('/apps', { replace: true });
    }
  }, [app, navigate]);

  const handleOpenApp = () => {
    if (app.slug === 'ishuri-calculator') {
      navigate('/app/ishuri-calculator');
    } else {
      // For other apps, you can add their specific routes here
      console.log(`Opening ${app.name}...`);
    }
  };

  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }}>
      <Container maxW="4xl">
        <Stack spacing={6}>
          <Flex align="center" gap={4}>
            <Flex
              align="center"
              justify="center"
              w={12}
              h={12}
              rounded="lg"
              bg="brand.50"
              color="brand.700"
            >
              <Icon as={app.icon} boxSize={6} />
            </Flex>
            <Box>
              <Heading as="h1" fontSize="2xl" fontWeight="bold">
                {app.name}
              </Heading>
              {app.price && (
                <Badge mt={1} colorScheme="brand" variant="subtle">
                  {app.price}
                </Badge>
              )}
              {app.version && (
                <Text mt={1} fontSize="sm" color="gray.500">
                  {app.version}
                </Text>
              )}
            </Box>
          </Flex>
          <Text fontSize="lg" color="gray.700">
            {app.description}
          </Text>
          <Box>
            <Heading as="h2" fontSize="xl" mb={2}>
              About this app
            </Heading>
            <Text color="gray.600">
              This section can be used to provide more details about the application's
              features, usage instructions or any other relevant information.  The
              original Ishuri platform hosts the actual functionality (e.g.
              calculators, dictionaries, AI assistants).  In this clone we
              provide a placeholder to illustrate where such functionality could
              live.  Feel free to replace this text with your own implementation.
            </Text>
          </Box>
          <Flex gap={4} mt={6}>
            <Button as={RouterLink} to="/apps" variant="outline" colorScheme="gray">
              Back to Apps
            </Button>
            <Button 
              colorScheme="brand" 
              onClick={handleOpenApp}
              disabled={app.category !== 'free' && app.slug !== 'ishuri-calculator'}
            >
              {app.category === 'free' ? 'Open App' : 'Subscribe to Access'}
            </Button>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default AppDetailsPage;