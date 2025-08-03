import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Avatar,
  Card,
  CardBody,
  Badge,
  Divider,
  useToast,
  SimpleGrid,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile as updateUserProfileService } from '../services/userService';
import { EmailIcon, PhoneIcon, CalendarIcon } from '@chakra-ui/icons';

const ProfilePage = () => {
  const { userProfile, userSubscription, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    username: userProfile?.username || '',
    school: userProfile?.school || '',
    level: userProfile?.level || '',
    bio: userProfile?.bio || '',
    userType: userProfile?.user_type || '',
    dateOfBirth: userProfile?.date_of_birth || '',
    mtnPhone: userProfile?.mtn_phone || '',
    airtelPhone: userProfile?.airtel_phone || '',
    email: userProfile?.email || ''
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Update using the userService
      const updatedProfile = await updateUserProfileService({
        full_name: formData.fullName,
        username: formData.username,
        school: formData.school,
        level: formData.level,
        bio: formData.bio,
        user_type: formData.userType,
        date_of_birth: formData.dateOfBirth,
        mtn_phone: formData.mtnPhone,
        airtel_phone: formData.airtelPhone,
        email: formData.email
      });
      
      // Update local state
      updateUserProfile(updatedProfile);
      
      setIsEditing(false);
      toast({
        title: 'Profile updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userProfile?.full_name || '',
      username: userProfile?.username || '',
      school: userProfile?.school || '',
      level: userProfile?.level || '',
      bio: userProfile?.bio || '',
      userType: userProfile?.user_type || '',
      dateOfBirth: userProfile?.date_of_birth || '',
      mtnPhone: userProfile?.mtn_phone || '',
      airtelPhone: userProfile?.airtel_phone || '',
      email: userProfile?.email || ''
    });
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    return 'U';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'Not provided';
    return phone;
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'premium': return 'purple';
      case 'standard': return 'blue';
      case 'free': return 'gray';
      default: return 'gray';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Free';
    return `${amount.toLocaleString()} RWF`;
  };

  const formatSubscriptionStatus = (status) => {
    if (!status) return 'Free Plan';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getSubscriptionStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'green';
      case 'cancelled': return 'red';
      case 'past_due': return 'orange';
      case 'trialing': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Container maxW="4xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2}>Profile Settings</Heading>
            <Text color="gray.600">Manage your account information and preferences</Text>
          </Box>

          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
            {/* Profile Card */}
            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <Avatar
                    size="xl"
                    name={userProfile?.full_name}
                    src={userProfile?.avatar_url}
                    bg="brand.500"
                  >
                    {getUserInitials()}
                  </Avatar>
                  <VStack spacing={1} textAlign="center">
                    <Heading size="md">{userProfile?.full_name || 'User'}</Heading>
                    <Text color="gray.600">@{userProfile?.username || 'username'}</Text>
                    <HStack spacing={2}>
                      <Badge colorScheme={getPlanBadgeColor(userProfile?.current_plan || userProfile?.plan)} size="sm">
                        {(userProfile?.plan_name || userProfile?.current_plan || userProfile?.plan || 'FREE').toUpperCase()}
                      </Badge>
                      {userSubscription?.subscription_status && (
                        <Badge colorScheme={getSubscriptionStatusColor(userSubscription.subscription_status)} size="sm">
                          {formatSubscriptionStatus(userSubscription.subscription_status)}
                        </Badge>
                      )}
                    </HStack>
                  </VStack>
                  <Divider />
                  
                  {/* Contact Information */}
                  <VStack spacing={3} w="full" align="stretch">
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">Contact Information</Text>
                    
                    <Flex align="center" gap={2}>
                      <Icon as={EmailIcon} color="gray.500" />
                      <VStack spacing={0} align="start" flex="1">
                        <Text fontSize="xs" color="gray.500">Email</Text>
                        <Text fontSize="sm">{userProfile?.email || 'Not specified'}</Text>
                      </VStack>
                    </Flex>
                    
                    <Flex align="center" gap={2}>
                      <Icon as={PhoneIcon} color="gray.500" />
                      <VStack spacing={0} align="start" flex="1">
                        <Text fontSize="xs" color="gray.500">MTN Phone</Text>
                        <Text fontSize="sm">{formatPhoneNumber(userProfile?.mtn_phone)}</Text>
                      </VStack>
                    </Flex>
                    
                    <Flex align="center" gap={2}>
                      <Icon as={PhoneIcon} color="gray.500" />
                      <VStack spacing={0} align="start" flex="1">
                        <Text fontSize="xs" color="gray.500">Airtel Phone</Text>
                        <Text fontSize="sm">{formatPhoneNumber(userProfile?.airtel_phone)}</Text>
                      </VStack>
                    </Flex>
                    
                    <Flex align="center" gap={2}>
                      <Icon as={CalendarIcon} color="gray.500" />
                      <VStack spacing={0} align="start" flex="1">
                        <Text fontSize="xs" color="gray.500">Date of Birth</Text>
                        <Text fontSize="sm">{formatDate(userProfile?.date_of_birth)}</Text>
                      </VStack>
                    </Flex>
                  </VStack>
                  
                  <Divider />
                  
                  {/* Academic Information */}
                  <VStack spacing={2} w="full" align="stretch">
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">Academic Information</Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>User Type:</strong> {userProfile?.user_type || 'Student'}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>School:</strong> {userProfile?.school || 'Not specified'}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Level:</strong> {userProfile?.level || 'Not specified'}
                    </Text>
                  </VStack>
                  
                  {userProfile?.created_at && (
                    <>
                      <Divider />
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Member since {formatDate(userProfile.created_at)}
                      </Text>
                    </>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {/* Profile Form */}
            <Box gridColumn={{ lg: 'span 2' }}>
              <VStack spacing={6}>
                {/* Personal Information Card */}
                <Card w="full">
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      <HStack justify="space-between">
                        <Heading size="md">Personal Information</Heading>
                        {!isEditing ? (
                          <Button
                            colorScheme="brand"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </Button>
                        ) : (
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                            <Button
                              colorScheme="brand"
                              size="sm"
                              onClick={handleSave}
                            >
                              Save Changes
                            </Button>
                          </HStack>
                        )}
                      </HStack>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl>
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Username</FormLabel>
                          <Input
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Date of Birth</FormLabel>
                          <Input
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>User Type</FormLabel>
                          {isEditing ? (
                            <Select
                              name="userType"
                              value={formData.userType}
                              onChange={handleInputChange}
                            >
                              <option value="">Select User Type</option>
                              <option value="Student">Student</option>
                              <option value="Teacher">Teacher</option>
                              <option value="Parent">Parent</option>
                            </Select>
                          ) : (
                            <Input
                              value={formData.userType}
                              isReadOnly
                              bg="gray.50"
                            />
                          )}
                        </FormControl>
                      </SimpleGrid>

                      <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          isReadOnly={!isEditing}
                          bg={isEditing ? 'white' : 'gray.50'}
                          placeholder="Tell us about yourself..."
                          rows={4}
                        />
                      </FormControl>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Academic Information Card */}
                <Card w="full">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading size="md">Academic Information</Heading>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl>
                          <FormLabel>School</FormLabel>
                          <Input
                            name="school"
                            value={formData.school}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Level</FormLabel>
                          <Input
                            name="level"
                            value={formData.level}
                            onChange={handleInputChange}
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>
                      </SimpleGrid>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Contact Information Card */}
                <Card w="full">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading size="md">Phone Numbers</Heading>
                      <Text fontSize="sm" color="gray.600">
                        Add your phone numbers for important notifications
                      </Text>

                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        <FormControl>
                          <FormLabel>MTN Phone</FormLabel>
                          <Input
                            name="mtnPhone"
                            value={formData.mtnPhone}
                            onChange={handleInputChange}
                            placeholder="078XXXXXXX or 079XXXXXXX"
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Airtel Phone</FormLabel>
                          <Input
                            name="airtelPhone"
                            value={formData.airtelPhone}
                            onChange={handleInputChange}
                            placeholder="073XXXXXXX or 075XXXXXXX"
                            isReadOnly={!isEditing}
                            bg={isEditing ? 'white' : 'gray.50'}
                          />
                        </FormControl>
                      </SimpleGrid>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Subscription Information Card */}
                <Card w="full">
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <Heading size="md">Subscription Details</Heading>
                      
                      {userSubscription ? (
                        <>
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                            <Stat>
                              <StatLabel>Current Plan</StatLabel>
                              <StatNumber fontSize="lg">{userSubscription.plan_name || 'Unknown'}</StatNumber>
                              <StatHelpText>
                                <Badge colorScheme={getSubscriptionStatusColor(userSubscription.subscription_status)}>
                                  {formatSubscriptionStatus(userSubscription.subscription_status)}
                                </Badge>
                              </StatHelpText>
                            </Stat>

                            <Stat>
                              <StatLabel>Billing Cycle</StatLabel>
                              <StatNumber fontSize="lg">
                                {userSubscription.billing_cycle === 'monthly' ? 'Monthly' : 'Annual'}
                              </StatNumber>
                              <StatHelpText>
                                {formatCurrency(
                                  userSubscription.billing_cycle === 'monthly' 
                                    ? userSubscription.monthly_price_rwf 
                                    : userSubscription.annual_price_rwf
                                )}
                              </StatHelpText>
                            </Stat>

                            {userSubscription.current_period_start && (
                              <Stat>
                                <StatLabel>Current Period</StatLabel>
                                <StatNumber fontSize="sm">
                                  {formatDate(userSubscription.current_period_start)}
                                </StatNumber>
                                <StatHelpText>
                                  to {formatDate(userSubscription.current_period_end)}
                                </StatHelpText>
                              </Stat>
                            )}

                            {userSubscription.payment_method_name && (
                              <Stat>
                                <StatLabel>Payment Method</StatLabel>
                                <StatNumber fontSize="lg">{userSubscription.payment_method_name}</StatNumber>
                              </Stat>
                            )}
                          </SimpleGrid>

                          {userSubscription.cancel_at_period_end && (
                            <Box p={3} bg="orange.50" borderRadius="md" border="1px" borderColor="orange.200">
                              <Text color="orange.700" fontSize="sm">
                                <strong>Notice:</strong> Your subscription will be cancelled at the end of the current billing period.
                              </Text>
                            </Box>
                          )}
                        </>
                      ) : (
                        <Box textAlign="center" py={4}>
                          <Text color="gray.600" mb={2}>You're currently on the free plan</Text>
                          <Text fontSize="sm" color="gray.500">
                            Upgrade to access premium features and content
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </CardBody>
                </Card>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProfilePage;
