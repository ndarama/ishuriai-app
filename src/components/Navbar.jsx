import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Collapse,
  Image,
  Spacer
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, NavLink } from 'react-router-dom';

// Defines the set of navigation links shown across the top of the site.  When
// editing this array you should update both the desktop HStack and the
// collapsed mobile menu below.  Each entry includes a title and a route.
const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Apps', to: '/apps' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' }
];

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="header" borderBottom="1px" borderColor="gray.200" bg="white" zIndex="10" w="full">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
        <Flex alignItems="center">
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo.svg" alt="Ishuri Platform" h={8} w="auto" mr={2} />
          </RouterLink>
        </Flex>
        {/* Desktop navigation */}
        <HStack as="nav" spacing={1} display={{ base: 'none', md: 'flex' }}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.to}
              as={NavLink}
              to={item.to}
              variant="ghost"
              px={4}
              py={2}
              fontSize="sm"
              _hover={{ bg: 'gray.100', color: 'brand.600' }}
              _activeLink={{ bg: 'gray.100', color: 'brand.600', fontWeight: 'semibold' }}
            >
              {item.label}
            </Button>
          ))}
        </HStack>
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          <Button as={NavLink} to="/auth/login" variant="outline" colorScheme="gray" size="sm">
            Log in
          </Button>
          <Button as={NavLink} to="/auth/register" colorScheme="brand" size="sm">
            Sign up
          </Button>
        </HStack>
        {/* Mobile menu toggle */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle navigation"
        />
      </Flex>
      {/* Mobile navigation menu */}
      <Collapse in={isOpen} animateOpacity>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={1} px={4}>
            {NAV_ITEMS.map((item) => (
              <Button
                key={item.to}
                as={NavLink}
                to={item.to}
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                px={4}
                py={2}
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'brand.600' }}
                _activeLink={{ bg: 'gray.100', color: 'brand.600', fontWeight: 'semibold' }}
                onClick={onToggle}
              >
                {item.label}
              </Button>
            ))}
            <Spacer />
            <Button as={NavLink} to="/auth/login" variant="outline" colorScheme="gray" size="sm" onClick={onToggle}>
              Log in
            </Button>
            <Button as={NavLink} to="/auth/register" colorScheme="brand" size="sm" onClick={onToggle}>
              Sign up
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;