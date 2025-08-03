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
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Badge,
  useToast
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, SettingsIcon } from '@chakra-ui/icons';
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Private navigation items for authenticated users
const PRIVATE_NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Apps', to: '/apps' },
  { label: 'Community', to: '/community' },
  { label: 'Help', to: '/help' }
];

// Plan configuration
const PLAN_CONFIG = {
  free: {
    name: 'Free Plan',
    color: 'gray',
    badge: 'FREE'
  },
  basic: {
    name: 'Basic Plan',
    color: 'blue',
    badge: 'BASIC'
  },
  pro: {
    name: 'Pro Plan',
    color: 'purple',
    badge: 'PRO'
  },
  premium: {
    name: 'Premium Plan',
    color: 'gold',
    badge: 'PREMIUM'
  }
};

const PrivateNavbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // Get user's current plan (defaulting to free if not specified)
  const currentPlan = userProfile?.plan || 'free';
  const planInfo = PLAN_CONFIG[currentPlan];

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  return (
    <Box as="header" borderBottom="1px" borderColor="gray.200" bg="white" zIndex="10" w="full">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto" px={{ base: 4, md: 6 }}>
        {/* Logo */}
        <Flex alignItems="center">
          <RouterLink to="/dashboard" style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo.svg" alt="Ishuri Platform" h={8} w="auto" mr={2} />
          </RouterLink>
        </Flex>

        {/* Desktop navigation */}
        <HStack as="nav" spacing={1} display={{ base: 'none', md: 'flex' }}>
          {PRIVATE_NAV_ITEMS.map((item) => (
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

        {/* Desktop user section */}
        <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
          {/* Current Plan */}
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">Plan:</Text>
            <Badge colorScheme={planInfo.color} fontSize="xs" px={2} py={1}>
              {planInfo.badge}
            </Badge>
          </HStack>

          {/* Upgrade Button (only show if not on premium plan) */}
          {currentPlan !== 'premium' && (
            <Button
              size="sm"
              colorScheme="brand"
              variant="outline"
              onClick={handleUpgrade}
            >
              Upgrade
            </Button>
          )}

          {/* User Menu */}
          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm" p={1}>
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={userProfile?.full_name || user?.email}
                  src={userProfile?.avatar_url}
                  bg="brand.500"
                >
                  {getUserInitials()}
                </Avatar>
                <Box textAlign="left" display={{ base: 'none', lg: 'block' }}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.900">
                    {userProfile?.full_name || 'User'}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {userProfile?.user_type || 'Member'}
                  </Text>
                </Box>
                <ChevronDownIcon />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/profile">
                <SettingsIcon mr={2} />
                Profile Settings
              </MenuItem>
              <MenuItem as={RouterLink} to="/account">
                Account
              </MenuItem>
              <MenuItem as={RouterLink} to="/billing">
                Billing
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut} color="red.500">
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
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
            {/* User info */}
            <Box p={4} bg="gray.50" borderRadius="md" mb={2}>
              <HStack spacing={3}>
                <Avatar
                  size="md"
                  name={userProfile?.full_name || user?.email}
                  src={userProfile?.avatar_url}
                  bg="brand.500"
                >
                  {getUserInitials()}
                </Avatar>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.900">
                    {userProfile?.full_name || 'User'}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    {userProfile?.user_type || 'Member'}
                  </Text>
                  <HStack spacing={2} mt={1}>
                    <Badge colorScheme={planInfo.color} fontSize="xs">
                      {planInfo.badge}
                    </Badge>
                  </HStack>
                </Box>
              </HStack>
            </Box>

            {/* Navigation items */}
            {PRIVATE_NAV_ITEMS.map((item) => (
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

            {/* Upgrade button for mobile */}
            {currentPlan !== 'premium' && (
              <Button
                colorScheme="brand"
                variant="outline"
                size="sm"
                w="full"
                mt={2}
                onClick={() => {
                  handleUpgrade();
                  onToggle();
                }}
              >
                Upgrade Plan
              </Button>
            )}

            {/* Profile and settings */}
            <Button
              as={RouterLink}
              to="/profile"
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              px={4}
              py={2}
              fontSize="sm"
              onClick={onToggle}
            >
              Profile Settings
            </Button>
            <Button
              as={RouterLink}
              to="/account"
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              px={4}
              py={2}
              fontSize="sm"
              onClick={onToggle}
            >
              Account
            </Button>
            <Button
              as={RouterLink}
              to="/billing"
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              px={4}
              py={2}
              fontSize="sm"
              onClick={onToggle}
            >
              Billing
            </Button>

            {/* Sign out */}
            <Button
              variant="ghost"
              w="full"
              justifyContent="flex-start"
              px={4}
              py={2}
              fontSize="sm"
              color="red.500"
              mt={2}
              onClick={() => {
                handleSignOut();
                onToggle();
              }}
            >
              Sign Out
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default PrivateNavbar;
