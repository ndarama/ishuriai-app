import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Stack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * AppCard renders a single application card used on the Apps page.  Cards
 * display an icon, title, optional subtitle (price or version), a brief
 * description and an action button.  The entire card is wrapped in a
 * border and subtle shadow to separate it from the background.  When
 * rendered inside a responsive grid the cards will automatically resize.
 */
const AppCard = ({ slug, icon, title, subtitle, description, actionLabel = 'Open App' }) => {
  const link = `/apps/${slug}`;
  return (
    <Box
      borderWidth="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="sm"
      overflow="hidden"
      bg="white"
    >
      <Stack spacing={2} p={6} pb={2}>
        <Flex align="center" gap={3}>
          {icon && (
            <Flex
              align="center"
              justify="center"
              w={10}
              h={10}
              rounded="lg"
              bg="brand.50"
              color="brand.700"
            >
              <Icon as={icon} boxSize={5} />
            </Flex>
          )}
          <Box>
            <Heading as="h4" fontSize="lg" fontWeight="semibold">
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="sm" color={subtitle.includes('RWF') ? 'brand.600' : 'gray.500'}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Flex>
      </Stack>
      <Box px={6} pt={0} pb={0}>
        <Text fontSize="sm" color="gray.600" mb={4}>
          {description}
        </Text>
      </Box>
      <Flex align="center" p={6} pt={0} bg="gray.50" borderTopWidth="1px">
        <Button as={RouterLink} to={link} variant="outline" colorScheme="brand" w="full" size="sm">
          {actionLabel}
        </Button>
      </Flex>
    </Box>
  );
};

export default AppCard;