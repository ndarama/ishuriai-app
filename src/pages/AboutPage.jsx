import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

/**
 * AboutPage provides background information about the Ishuri project.  It
 * outlines the mission and vision of the platform, emphasising its focus
 * on serving the Rwandan education community through modern technology.
 */
const AboutPage = () => {
  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }}>
      <Container maxW="4xl">
        <Stack spacing={6}>
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="gray.900">
            About Ishuri Platform
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.700">
            Ishuri Platform is an open initiative to democratise access to high‑quality educational
            resources across Rwanda.  By combining artificial intelligence, intuitive design and
            community‑driven content, our goal is to empower students, teachers and parents to
            learn, teach and support one another more effectively.
          </Text>
          <Heading as="h2" fontSize="xl" fontWeight="semibold" mt={4}>
            Our Mission
          </Heading>
          <Text color="gray.700">
            We believe every learner deserves the best tools to unlock their potential.  Our mission
            is to provide accessible, culturally relevant educational technology that enhances
            understanding, fosters curiosity and supports lifelong learning.
          </Text>
          <Heading as="h2" fontSize="xl" fontWeight="semibold" mt={4}>
            Core Values
          </Heading>
          <List spacing={3}>
            <ListItem display="flex" alignItems="flex-start">
              <ListIcon as={CheckCircleIcon} color="brand.600" mt={1} />
              Innovation – leverage cutting‑edge AI to solve real educational challenges.
            </ListItem>
            <ListItem display="flex" alignItems="flex-start">
              <ListIcon as={CheckCircleIcon} color="brand.600" mt={1} />
              Accessibility – ensure everyone can access our tools regardless of location or means.
            </ListItem>
            <ListItem display="flex" alignItems="flex-start">
              <ListIcon as={CheckCircleIcon} color="brand.600" mt={1} />
              Community – collaborate with educators, students and parents to shape the platform.
            </ListItem>
            <ListItem display="flex" alignItems="flex-start">
              <ListIcon as={CheckCircleIcon} color="brand.600" mt={1} />
              Respect – reflect Rwanda's cultures and languages in all we do.
            </ListItem>
          </List>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutPage;