import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Stack,
  Badge,
  Flex
} from '@chakra-ui/react';
// icons are imported in the central apps data file.  No icons are required
// in this page directly.
import AppCard from '../components/AppCard';
import { appsData } from '../data/apps';


const categories = {
  free: 'Free Apps',
  standard: 'Standard Apps',
  premium: 'Premium Apps'
};

const categoryPrices = {
  standard: 'RWF 5,900/month',
  premium: 'RWF 11,900/month'
};

const AppsPage = () => {
  // Helpers to filter apps by category
  const freeApps = appsData.filter((app) => app.category === 'free');
  const standardApps = appsData.filter((app) => app.category === 'standard');
  const premiumApps = appsData.filter((app) => app.category === 'premium');

  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }}>
      <Container maxW="6xl">
        <Stack textAlign="center" mb={12} spacing={4}>
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="gray.900">
            Ishuri Platform Apps
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="3xl" mx="auto">
            Discover our collection of educational tools designed for Rwanda's education system.
          </Text>
        </Stack>
        <Tabs variant="soft-rounded" colorScheme="brand" size="md">
          <TabList justifyContent="center" mb={8} display="grid" gridTemplateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={2}>
            <Tab>All Apps</Tab>
            <Tab>Free</Tab>
            <Tab>Standard</Tab>
            <Tab>Premium</Tab>
          </TabList>
          <TabPanels>
            {/* All Apps tab shows each category separated by headings */}
            <TabPanel>
              <Stack spacing={12}>
                <CategorySection
                  title={categories.free}
                  apps={freeApps}
                />
                <CategorySection
                  title={categories.standard}
                  priceTag={categoryPrices.standard}
                  apps={standardApps}
                />
                <CategorySection
                  title={categories.premium}
                  priceTag={categoryPrices.premium}
                  apps={premiumApps}
                />
              </Stack>
            </TabPanel>
            {/* Free Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
                {freeApps.map((app) => (
                  <AppCard
                    key={app.slug}
                    slug={app.slug}
                    icon={app.icon}
                    title={app.name}
                    subtitle={app.version}
                    description={app.description}
                    actionLabel={app.action}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
            {/* Standard Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
                {standardApps.map((app) => (
                  <AppCard
                    key={app.slug}
                    slug={app.slug}
                    icon={app.icon}
                    title={app.name}
                    subtitle={app.price}
                    description={app.description}
                    actionLabel={app.action}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
            {/* Premium Tab */}
            <TabPanel>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
                {premiumApps.map((app) => (
                  <AppCard
                    key={app.slug}
                    slug={app.slug}
                    icon={app.icon}
                    title={app.name}
                    subtitle={app.price}
                    description={app.description}
                    actionLabel={app.action}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

// CategorySection renders a heading and optional price tag followed by a grid
// of AppCards.  It is used in the All Apps tab to group apps by
// category.
const CategorySection = ({ title, priceTag, apps }) => {
  return (
    <Box>
      <Flex align="center" mb={6}>
        <Heading as="h2" fontSize="2xl" fontWeight="bold" color="gray.900">
          {title}
        </Heading>
        <Box flex="1" ml={4} h="0.5" bg="gray.200" />
        {priceTag && (
          <Badge ml={4} px={3} py={1} rounded="full" colorScheme={title.includes('Premium') ? 'purple' : 'green'}>
            {priceTag}
          </Badge>
        )}
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {apps.map((app) => (
          <AppCard
            key={app.slug}
            slug={app.slug}
            icon={app.icon}
            title={app.name}
            subtitle={app.version || app.price}
            description={app.description}
            actionLabel={app.action}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AppsPage;