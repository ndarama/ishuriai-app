import React from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Avatar,
  Badge,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AppNavbar = ({ 
  appName = "IshuriCalculator", 
  appDescription = "A powerful and versatile calculator for all your needs.",
  userPlan = "Free Plan",
  showBackButton = true,
  backTo = "/apps"
}) => {
  const navigate = useNavigate();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');

  const handleBackClick = () => {
    navigate(backTo);
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  return (
    <Box 
      as="header" 
      borderBottom="1px" 
      borderColor={borderColor} 
      bg={bgColor} 
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
      w="full"
    >
      <Flex 
        h={16} 
        alignItems="center" 
        justifyContent="space-between" 
        maxW="7xl" 
        mx="auto" 
        px={{ base: 4, md: 6 }}
      >
        {/* Left section with back button and app info */}
        <Flex alignItems="center" flex="1">
          {showBackButton && (
            <Button
              leftIcon={<FiArrowLeft />}
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              mr={4}
              color={subtitleColor}
              _hover={{ bg: 'gray.100', color: textColor }}
            >
              Back to Apps
            </Button>
          )}
          
          <Box>
            <Text 
              fontSize="lg" 
              fontWeight="bold" 
              color={textColor}
              lineHeight="1.2"
            >
              {appName}
            </Text>
            <Text 
              fontSize="sm" 
              color={subtitleColor}
              lineHeight="1.2"
              display={{ base: 'none', md: 'block' }}
            >
              {appDescription}
            </Text>
          </Box>
        </Flex>

        {/* Right section with plan, upgrade button, and user avatar */}
        <HStack spacing={4} alignItems="center">
          {/* Plan badge */}
          <Badge 
            colorScheme="gray" 
            variant="subtle"
            fontSize="xs"
            px={2}
            py={1}
            borderRadius="md"
            display={{ base: 'none', sm: 'flex' }}
          >
            {userPlan}
          </Badge>

          {/* Upgrade button */}
          <Button
            colorScheme="blue"
            size="sm"
            variant="solid"
            leftIcon={<Box as="span" fontSize="xs">👑</Box>}
            onClick={handleUpgrade}
            _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
            transition="all 0.2s"
          >
            Upgrade
          </Button>

          {/* User avatar/profile */}
          <IconButton
            icon={<FiUser />}
            variant="ghost"
            size="sm"
            borderRadius="full"
            onClick={() => navigate('/profile')}
            _hover={{ bg: 'gray.100' }}
            aria-label="User profile"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default AppNavbar;
