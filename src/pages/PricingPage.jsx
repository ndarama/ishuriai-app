import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Button,
  List,
  ListItem,
  ListIcon,
  HStack,
  Switch,
  Badge,
  Divider,
  Icon
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

/**
 * PricingPage outlines the subscription tiers available on the Ishuri platform.
 * It follows a simple three‑column layout for Free, Standard and Premium
 * plans.  Each plan lists the included applications and displays the
 * associated price.  Adjust the features and pricing as necessary.
 */
const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      monthlyPrice: 'RWF 0',
      annualPrice: 'RWF 0',
      description: 'Start with the basics',
      features: [
        'Calculator, Dictionary, Formula & Periodic Table',
        'Access to free learning resources',
        'No credit card required'
      ],
      cta: { label: 'Get Started', to: '/auth/register' }
    },
    {
      name: 'Standard',
      monthlyPrice: 'RWF 5,900/month',
      annualPrice: 'RWF 59,000/year',
      description: 'Advanced tools for everyday learning',
      features: [
        'Everything in Free',
        'AI Assistant for all subjects',
        'ExamsPrep Lite & Traffic Analytics'
      ],
      cta: { label: 'Choose Standard', to: '/auth/register' },
      savings: 'Save 16%'
    },
    {
      name: 'Premium',
      monthlyPrice: 'RWF 11,900/month',
      annualPrice: 'RWF 119,000/year',
      description: 'Unlock the full experience',
      features: [
        'Everything in Standard',
        'ExamsPrep Advance',
        'Problem Solver & Interactive Stories'
      ],
      cta: { label: 'Choose Premium', to: '/auth/register' },
      savings: 'Save 16%'
    }
  ];

  return (
    <Box as="main" py={12} px={{ base: 4, sm: 6, lg: 8 }}>
      <Container maxW="6xl">
        <Stack spacing={4} textAlign="center" mb={12}>
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="gray.900">
            Pricing
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="gray.600" maxW="3xl" mx="auto">
            Choose a plan that's right for you.  Upgrade or downgrade at any time.
          </Text>
          
          {/* Billing Toggle */}
          <HStack justify="center" spacing={4} mt={8}>
            <Text color={!isAnnual ? "brand.600" : "gray.600"} fontWeight={!isAnnual ? "bold" : "normal"}>
              Monthly
            </Text>
            <Switch
              colorScheme="brand"
              size="lg"
              isChecked={isAnnual}
              onChange={(e) => setIsAnnual(e.target.checked)}
            />
            <HStack spacing={2}>
              <Text color={isAnnual ? "brand.600" : "gray.600"} fontWeight={isAnnual ? "bold" : "normal"}>
                Annual
              </Text>
              <Badge colorScheme="green" variant="solid" fontSize="xs">
                Save 16%
              </Badge>
            </HStack>
          </HStack>
        </Stack>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {plans.map((plan) => (
            <Box
              key={plan.name}
              borderWidth="1px"
              borderColor="gray.200"
              rounded="lg"
              shadow="sm"
              bg="white"
              p={8}
              textAlign="left"
            >
              <Stack spacing={4} mb={6}>
                <HStack justify="space-between" align="flex-start">
                  <Heading as="h2" fontSize="2xl" fontWeight="bold">
                    {plan.name}
                  </Heading>
                  {isAnnual && plan.savings && plan.name !== 'Free' && (
                    <Badge colorScheme="green" variant="outline" fontSize="xs">
                      {plan.savings}
                    </Badge>
                  )}
                </HStack>
                <Text fontSize="3xl" fontWeight="extrabold" color="brand.600">
                  {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                </Text>
                <Text color="gray.600">{plan.description}</Text>
              </Stack>
              <List spacing={3} mb={6}>
                {plan.features.map((feature) => (
                  <ListItem key={feature} display="flex" alignItems="flex-start">
                    <ListIcon as={CheckCircleIcon} color="brand.600" mt={1} />
                    <Text>{feature}</Text>
                  </ListItem>
                ))}
              </List>
              
              {/* Payment Methods Section */}
              {plan.name !== 'Free' && (
                <>
                  <Divider mb={4} />
                  <Box mb={6}>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                      Payment Methods:
                    </Text>
                    <Stack spacing={2}>
                      <HStack spacing={2}>
                        <Box w={3} h={3} bg="orange.500" rounded="full" />
                        <Text fontSize="sm" color="gray.600">MTN Mobile Money Rwanda</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Box w={3} h={3} bg="red.500" rounded="full" />
                        <Text fontSize="sm" color="gray.600">Airtel Money Rwanda</Text>
                      </HStack>
                    </Stack>
                  </Box>
                </>
              )}
              
              <Button
                as={RouterLink}
                to={plan.cta.to}
                colorScheme="brand"
                w="full"
                size="md"
              >
                {plan.cta.label}
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default PricingPage;