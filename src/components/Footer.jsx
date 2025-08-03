import React from 'react';
import { Box, Container, Text, Link, Stack, HStack, Icon } from '@chakra-ui/react';
import { FiFacebook, FiTwitter, FiGithub } from 'react-icons/fi';

/**
 * Footer component displayed at the bottom of every page.  It contains a
 * simple copyright notice and placeholder links for social media.  You can
 * customise these icons and URLs to point at your own accounts.
 */
const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={8} mt={12}>
      <Container maxW="6xl">
        <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" spacing={4}>
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} Ishuri Platform. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <Link href="#" isExternal>
              <Icon as={FiFacebook} boxSize={5} color="brand.600" />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FiTwitter} boxSize={5} color="brand.600" />
            </Link>
            <Link href="https://github.com/" isExternal>
              <Icon as={FiGithub} boxSize={5} color="brand.600" />
            </Link>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;