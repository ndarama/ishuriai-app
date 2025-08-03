import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Heading,
  useToast,
  Container,
  FormErrorMessage,
  Divider
} from '@chakra-ui/react';
import { signUpWithProfile } from '../services/authService';
import { checkUsernameAvailability, checkPhoneAvailability } from '../services/userService';
import { getAllSchools, getSchoolsByType } from '../data/schools';

const ProfileRegistrationForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    // Auth fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Profile fields
    fullName: '',
    username: '',
    dateOfBirth: '',
    school: '',
    level: '',
    userType: '',
    mtnPhone: '',
    airtelPhone: '',
    acceptTerms: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [phoneChecking, setPhoneChecking] = useState({ mtn: false, airtel: false });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear specific field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const checkUsername = async (username) => {
    if (username.length < 3) return;
    
    setUsernameChecking(true);
    try {
      const isAvailable = await checkUsernameAvailability(username);
      if (!isAvailable) {
        setFieldErrors(prev => ({
          ...prev,
          username: 'Username is already taken'
        }));
      } else {
        setFieldErrors(prev => ({
          ...prev,
          username: ''
        }));
      }
    } catch (error) {
      console.error('Error checking username:', error);
    } finally {
      setUsernameChecking(false);
    }
  };

  const handleUsernameBlur = () => {
    if (formData.username) {
      checkUsername(formData.username);
    }
  };

  const checkPhone = async (phoneNumber, phoneType) => {
    if (!phoneNumber) return;
    
    // Validate format first
    const mtnPhoneRegex = /^(\+25078\d{7}|078\d{7}|\+25079\d{7}|079\d{7})$/;
    const airtelPhoneRegex = /^(\+25073\d{7}|073\d{7}|\+25072\d{7}|072\d{7})$/;
    
    const isValidFormat = phoneType === 'mtn' 
      ? mtnPhoneRegex.test(phoneNumber)
      : airtelPhoneRegex.test(phoneNumber);
    
    if (!isValidFormat) return;
    
    setPhoneChecking(prev => ({ ...prev, [phoneType]: true }));
    try {
      const isAvailable = await checkPhoneAvailability(phoneNumber, phoneType);
      const fieldName = phoneType === 'mtn' ? 'mtnPhone' : 'airtelPhone';
      
      if (!isAvailable) {
        setFieldErrors(prev => ({
          ...prev,
          [fieldName]: `This ${phoneType.toUpperCase()} phone number is already registered`
        }));
      } else {
        setFieldErrors(prev => ({
          ...prev,
          [fieldName]: ''
        }));
      }
    } catch (error) {
      console.error(`Error checking ${phoneType} phone:`, error);
    } finally {
      setPhoneChecking(prev => ({ ...prev, [phoneType]: false }));
    }
  };

  const handleMtnPhoneBlur = () => {
    if (formData.mtnPhone) {
      checkPhone(formData.mtnPhone, 'mtn');
    }
  };

  const handleAirtelPhoneBlur = () => {
    if (formData.airtelPhone) {
      checkPhone(formData.airtelPhone, 'airtel');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Profile fields validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 5 || age > 100) {
        errors.dateOfBirth = 'Please enter a valid date of birth';
      }
    }
    
    if (!formData.school.trim()) {
      errors.school = 'School is required';
    }
    
    if (!formData.level.trim()) {
      errors.level = 'Level is required';
    }
    
    if (!formData.userType) {
      errors.userType = 'Please select your role';
    }
    
    // Phone number validation
    const mtnPhoneRegex = /^(\+25078\d{7}|078\d{7}|\+25079\d{7}|079\d{7})$/;
    const airtelPhoneRegex = /^(\+25073\d{7}|073\d{7}|\+25072\d{7}|072\d{7})$/;
    
    // At least one phone number is required
    if (!formData.mtnPhone.trim() && !formData.airtelPhone.trim()) {
      errors.phoneRequired = 'At least one phone number (MTN or AIRTEL) is required';
    }
    
    // Validate MTN phone format if provided
    if (formData.mtnPhone.trim() && !mtnPhoneRegex.test(formData.mtnPhone.trim())) {
      errors.mtnPhone = 'MTN phone must start with 078 or 079 (e.g., 0781234567 or +250781234567)';
    }
    
    // Validate AIRTEL phone format if provided
    if (formData.airtelPhone.trim() && !airtelPhoneRegex.test(formData.airtelPhone.trim())) {
      errors.airtelPhone = 'AIRTEL phone must start with 073 or 072 (e.g., 0731234567 or +250731234567)';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { email, password, confirmPassword, ...profileData } = formData;
      
      console.log('Starting registration with profile data:', profileData);
      
      const result = await signUpWithProfile({
        email,
        password,
        confirmPassword,
        profileData
      });
      
      console.log('Registration result:', result);
      
      if (result.needsEmailConfirmation) {
        toast({
          title: 'Registration Successful!',
          description: result.profileCreated 
            ? 'Please check your email to confirm your account. Your profile has been saved.'
            : 'Please check your email to confirm your account. Complete your profile after confirmation.',
          status: 'success',
          duration: 6000,
          isClosable: true,
        });
      } else if (result.profileCreated) {
        toast({
          title: 'Registration Complete!',
          description: 'Your account and profile have been created successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Account Created!',
          description: result.profileError 
            ? 'Account created but profile setup needs completion. Please complete your profile.'
            : 'Account created successfully. Please complete your profile.',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      }
      
      if (onSuccess) onSuccess(result);
      
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Level options based on user type
  const getLevelOptions = () => {
    switch (formData.userType) {
      case 'Student':
        return [
          'Pre-Primary', 'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
          'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'University Year 1', 'University Year 2', 
          'University Year 3', 'University Year 4', 'Masters', 'PhD'
        ];
      case 'Teacher':
        return [
          'Pre-Primary Teacher', 'Primary Teacher', 'Secondary Teacher', 
          'University Lecturer', 'Private Tutor', 'Administrator'
        ];
      case 'Parent':
        return [
          'Parent of Pre-Primary', 'Parent of Primary', 'Parent of Secondary', 
          'Parent of University Student', 'Guardian'
        ];
      default:
        return [];
    }
  };

  return (
    <Container maxW="md" py={8}>
      <Box bg="white" p={8} rounded="lg" shadow="md">
        <VStack spacing={6}>
          <Heading size="lg" textAlign="center" color="blue.600">
            Create Your Account
          </Heading>
          
          {error && (
            <Alert status="error" rounded="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack spacing={4}>
              {/* Account Information */}
              <Box w="100%">
                <Text fontSize="lg" fontWeight="semibold" mb={3} color="gray.700">
                  Account Information
                </Text>
                
                <VStack spacing={3}>
                  <FormControl isInvalid={fieldErrors.email}>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                    <FormErrorMessage>{fieldErrors.email}</FormErrorMessage>
                  </FormControl>
                  
                  <HStack spacing={3} w="100%">
                    <FormControl isInvalid={fieldErrors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                      />
                      <FormErrorMessage>{fieldErrors.password}</FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isInvalid={fieldErrors.confirmPassword}>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                      />
                      <FormErrorMessage>{fieldErrors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                  </HStack>
                </VStack>
              </Box>
              
              <Divider />
              
              {/* Personal Information */}
              <Box w="100%">
                <Text fontSize="lg" fontWeight="semibold" mb={3} color="gray.700">
                  Personal Information
                </Text>
                
                <VStack spacing={3}>
                  <FormControl isInvalid={fieldErrors.fullName}>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                    <FormErrorMessage>{fieldErrors.fullName}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={fieldErrors.username}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      onBlur={handleUsernameBlur}
                      placeholder="Choose a unique username"
                    />
                    {usernameChecking && <Text fontSize="sm" color="blue.500">Checking availability...</Text>}
                    <FormErrorMessage>{fieldErrors.username}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={fieldErrors.dateOfBirth}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{fieldErrors.dateOfBirth}</FormErrorMessage>
                  </FormControl>
                  
                  {/* Phone Numbers Section */}
                  <Box w="100%">
                    <Text fontSize="md" fontWeight="semibold" mb={2} color="gray.700">
                      Phone Numbers (At least one required)
                    </Text>
                    {fieldErrors.phoneRequired && (
                      <Text color="red.500" fontSize="sm" mb={2}>
                        {fieldErrors.phoneRequired}
                      </Text>
                    )}
                    
                    <VStack spacing={3}>
                      <FormControl isInvalid={fieldErrors.mtnPhone}>
                        <FormLabel>MTN Rwanda Phone Number</FormLabel>
                        <Input
                          name="mtnPhone"
                          value={formData.mtnPhone}
                          onChange={handleInputChange}
                          onBlur={handleMtnPhoneBlur}
                          placeholder="078XXXXXXX or 079XXXXXXX"
                          type="tel"
                        />
                        <Text fontSize="xs" color="gray.500">
                          Format: 0781234567 or +250781234567
                        </Text>
                        {phoneChecking.mtn && <Text fontSize="sm" color="blue.500">Checking availability...</Text>}
                        <FormErrorMessage>{fieldErrors.mtnPhone}</FormErrorMessage>
                      </FormControl>
                      
                      <FormControl isInvalid={fieldErrors.airtelPhone}>
                        <FormLabel>AIRTEL Rwanda Phone Number</FormLabel>
                        <Input
                          name="airtelPhone"
                          value={formData.airtelPhone}
                          onChange={handleInputChange}
                          onBlur={handleAirtelPhoneBlur}
                          placeholder="073XXXXXXX or 072XXXXXXX"
                          type="tel"
                        />
                        <Text fontSize="xs" color="gray.500">
                          Format: 0731234567 or +250731234567
                        </Text>
                        {phoneChecking.airtel && <Text fontSize="sm" color="blue.500">Checking availability...</Text>}
                        <FormErrorMessage>{fieldErrors.airtelPhone}</FormErrorMessage>
                      </FormControl>
                    </VStack>
                  </Box>
                  
                  <FormControl isInvalid={fieldErrors.school}>
                    <FormLabel>School/Institution</FormLabel>
                    <Select
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="Select your school/institution"
                    >
                      {getAllSchools().map(school => (
                        <option key={school.id} value={school.name}>
                          {school.name} - {school.district}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{fieldErrors.school}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={fieldErrors.userType}>
                    <FormLabel>I am a</FormLabel>
                    <Select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      placeholder="Select your role"
                    >
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Parent">Parent</option>
                    </Select>
                    <FormErrorMessage>{fieldErrors.userType}</FormErrorMessage>
                  </FormControl>
                  
                  {formData.userType && (
                    <FormControl isInvalid={fieldErrors.level}>
                      <FormLabel>Level</FormLabel>
                      <Select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        placeholder="Select your level"
                      >
                        {getLevelOptions().map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </Select>
                      <FormErrorMessage>{fieldErrors.level}</FormErrorMessage>
                    </FormControl>
                  )}
                </VStack>
              </Box>
              
              <Divider />
              
              {/* Terms and Conditions */}
              <FormControl isInvalid={fieldErrors.acceptTerms}>
                <Checkbox
                  name="acceptTerms"
                  isChecked={formData.acceptTerms}
                  onChange={handleInputChange}
                >
                  I accept the{' '}
                  <Text as="span" color="blue.500" textDecoration="underline">
                    Terms and Conditions
                  </Text>{' '}
                  and{' '}
                  <Text as="span" color="blue.500" textDecoration="underline">
                    Privacy Policy
                  </Text>
                </Checkbox>
                <FormErrorMessage>{fieldErrors.acceptTerms}</FormErrorMessage>
              </FormControl>
              
              <HStack spacing={3} w="100%">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  w="100%"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="Creating Account..."
                  w="100%"
                >
                  Create Account
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProfileRegistrationForm;
