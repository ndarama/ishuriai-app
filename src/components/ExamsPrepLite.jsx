import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Button,
  Text,
  useColorModeValue,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  Flex,
  Icon,
  Badge,
  useToast,
  Progress,
  RadioGroup,
  Radio,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Spacer,
  IconButton,
  Divider,
  Heading
} from '@chakra-ui/react';
import { 
  FiClock, 
  FiBookOpen, 
  FiTarget,
  FiPlay,
  FiEdit,
  FiChevronLeft,
  FiChevronRight,
  FiRotateCcw
} from 'react-icons/fi';

const ExamsPrepLite = () => {
  const [examSettings, setExamSettings] = useState({
    educationLevel: 'Primary School',
    class: 'Primary 6',
    subject: 'Mathematics (Primary 6)',
    year: '2025'
  });
  const [selectedMode, setSelectedMode] = useState('mock');
  const [currentView, setCurrentView] = useState('settings'); // 'settings' or 'exam'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  // Sample data
  const educationLevels = ['Primary School', 'Secondary School', 'University'];
  const classes = {
    'Primary School': ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'],
    'Secondary School': ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    'University': ['Year 1', 'Year 2', 'Year 3', 'Year 4']
  };
  const subjects = {
    'Primary 6': ['Mathematics (Primary 6)', 'English (Primary 6)', 'Kinyarwanda (Primary 6)', 'Science (Primary 6)', 'Social Studies (Primary 6)']
  };
  const years = ['2023', '2024', '2025'];

  // Sample exam configuration data
  const examConfiguration = [
    { section: 'Section A: Multiple Choice', courseCode: 'MATH 101', timeLimit: '60 minutes', questions: 40, marks: 40, difficulty: 'Beginner', notes: 'Not Allowed' },
    { section: 'Section B: Short Answers', courseCode: 'MATH 102', timeLimit: '45 minutes', questions: 25, marks: 50, difficulty: 'Intermediate', notes: 'Allowed' },
    { section: 'Section C: Problem Solving', courseCode: 'MATH 103', timeLimit: '90 minutes', questions: 15, marks: 75, difficulty: 'Advanced', notes: 'Not Allowed' }
  ];

  // Sample exam sections
  const examSections = [
    'Section A: Multiple Choice',
    'Section B: Short Answer',
    'Section C: Problem Solving',
    'Section D: Essay Questions',
    'Section E: Practical Problems solving the exams',
    'Section F: Practical Problem solving',
    'Section G: Practical problem solving the exams',
    'Section H: Essay questions',
    'Section I: Practical Reading and understanding'
  ];

  // Sample questions
  const questions = [
    {
      id: 1,
      question: "What is 15 + 27?",
      options: ["40", "42", "43", "45"],
      correctAnswer: "42"
    },
    {
      id: 2,
      question: "What is 8 × 7?",
      options: ["54", "56", "58", "60"],
      correctAnswer: "56"
    },
    {
      id: 3,
      question: "What is 144 ÷ 12?",
      options: ["10", "11", "12", "13"],
      correctAnswer: "12"
    },
    {
      id: 4,
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      correctAnswer: "20"
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSettingChange = (field, value) => {
    setExamSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartExam = (mode) => {
    if (!examSettings.educationLevel || !examSettings.class || !examSettings.subject) {
      toast({
        title: 'Please complete exam settings',
        description: 'Select all required fields before starting the exam.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setSelectedMode(mode);
    setCurrentView('exam');
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setTimeRemaining(60 * 60); // Reset to 60 minutes
    setIsTimerRunning(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer('');
    }
  };

  const handleRestartExam = () => {
    setCurrentView('settings');
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setTimeRemaining(60 * 60);
    setIsTimerRunning(false);
  };

  const calculateProgress = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  // Exam interface render
  const renderExamInterface = () => (
    <Box bg={bgColor} minH="calc(100vh - 64px)">
      {/* Exam Header */}
      <Box bg={cardBg} borderBottom="1px" borderColor={borderColor} px={8} py={4}>
        <Flex align="center">
          <Heading size="md" color={textColor}>
            Mock Exam
          </Heading>
          <Spacer />
          <Text fontSize="lg" color={textColor} mr={4}>
            {examSettings.subject} - {examSettings.class}
          </Text>
          <HStack spacing={4}>
            <HStack>
              <Icon as={FiClock} color="red.500" />
              <Text fontSize="lg" fontWeight="bold" color="red.500">
                {formatTime(timeRemaining)}
              </Text>
            </HStack>
            <IconButton
              icon={<FiRotateCcw />}
              onClick={handleRestartExam}
              variant="outline"
              colorScheme="blue"
              aria-label="Restart exam"
            />
          </HStack>
        </Flex>
      </Box>

      <Container maxW="4xl" py={8}>
        <VStack spacing={6} align="stretch">
          {/* Progress */}
          <Card bg={cardBg}>
            <CardBody>
              <HStack justify="space-between" mb={4}>
                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                  Question {currentQuestion + 1} of {questions.length}
                </Text>
                <Text fontSize="md" color={subtitleColor}>
                  {Math.round(calculateProgress())}% Complete
                </Text>
              </HStack>
              <Progress 
                value={calculateProgress()} 
                colorScheme="blue" 
                size="lg" 
                borderRadius="md"
              />
            </CardBody>
          </Card>

          {/* Question */}
          <Card bg={cardBg}>
            <CardBody>
              <VStack align="stretch" spacing={6}>
                <Heading size="md" color={textColor}>
                  Question {currentQuestion + 1}
                </Heading>
                
                <Text fontSize="lg" color={textColor}>
                  {questions[currentQuestion].question}
                </Text>

                <RadioGroup value={selectedAnswer} onChange={setSelectedAnswer}>
                  <VStack align="start" spacing={3}>
                    {questions[currentQuestion].options.map((option, index) => (
                      <Radio key={index} value={option} size="lg">
                        <Text fontSize="md" color={textColor}>
                          {option}
                        </Text>
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </VStack>
            </CardBody>
          </Card>

          {/* Navigation */}
          <HStack justify="space-between">
            <Button
              leftIcon={<FiChevronLeft />}
              onClick={handlePreviousQuestion}
              isDisabled={currentQuestion === 0}
              variant="outline"
              size="lg"
            >
              Previous
            </Button>
            
            <Text fontSize="sm" color={subtitleColor} textAlign="center">
              Answers are not recorded - for display purposes only
            </Text>
            
            <Button
              rightIcon={<FiChevronRight />}
              onClick={handleNextQuestion}
              isDisabled={currentQuestion === questions.length - 1}
              colorScheme="blue"
              size="lg"
            >
              Next
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );

  // Settings interface render
  const renderSettingsInterface = () => (
    <Box bg={bgColor} minH="calc(100vh - 64px)">
      <Grid templateColumns="300px 1fr" h="calc(100vh - 64px)">
        {/* Sidebar */}
        <GridItem bg={sidebarBg} borderRight="1px" borderColor={borderColor} p={6} overflowY="auto">
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" color={textColor} mb={4}>
                Exam Settings
              </Heading>
            </Box>

            {/* Education Level */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
                Education Level:
              </FormLabel>
              <Select
                value={examSettings.educationLevel}
                onChange={(e) => handleSettingChange('educationLevel', e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
              >
                {educationLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Class */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
                Class:
              </FormLabel>
              <Select
                value={examSettings.class}
                onChange={(e) => handleSettingChange('class', e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
              >
                {classes[examSettings.educationLevel]?.map(cls => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Subject */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
                Subject:
              </FormLabel>
              <Select
                value={examSettings.subject}
                onChange={(e) => handleSettingChange('subject', e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
              >
                {subjects[examSettings.class]?.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </Select>
            </FormControl>

            {/* Year */}
            <FormControl>
              <FormLabel fontSize="sm" fontWeight="semibold" color={textColor}>
                Year:
              </FormLabel>
              <Select
                value={examSettings.year}
                onChange={(e) => handleSettingChange('year', e.target.value)}
                bg={cardBg}
                borderColor={borderColor}
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Divider />

            {/* Exam Configuration Table */}
            <Box>
              <Text fontSize="md" fontWeight="semibold" color={textColor} mb={3}>
                Exam Configuration:
              </Text>
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize="xs">Course Code</Th>
                    <Th fontSize="xs">Time Limit</Th>
                    <Th fontSize="xs">Questions</Th>
                    <Th fontSize="xs">Marks</Th>
                    <Th fontSize="xs">Difficulty</Th>
                    <Th fontSize="xs">Calculator</Th>
                    <Th fontSize="xs">Formula Sheet</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {examConfiguration.map((config, index) => (
                    <Tr key={index}>
                      <Td fontSize="xs">{config.courseCode}</Td>
                      <Td fontSize="xs">{config.timeLimit}</Td>
                      <Td fontSize="xs">{config.questions}</Td>
                      <Td fontSize="xs">{config.marks}</Td>
                      <Td fontSize="xs">
                        <Badge size="sm" colorScheme={config.difficulty === 'Beginner' ? 'green' : config.difficulty === 'Intermediate' ? 'yellow' : 'red'}>
                          {config.difficulty}
                        </Badge>
                      </Td>
                      <Td fontSize="xs">{config.notes}</Td>
                      <Td fontSize="xs">Provided</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

            <Divider />

            {/* Exam Sections */}
            <Box>
              <Text fontSize="md" fontWeight="semibold" color={textColor} mb={3}>
                Exam Sections:
              </Text>
              <VStack align="start" spacing={1}>
                {examSections.map((section, index) => (
                  <Text key={index} fontSize="xs" color={subtitleColor}>
                    {section}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Divider />

            {/* Instructions */}
            <Box>
              <Text fontSize="md" fontWeight="semibold" color={textColor} mb={3}>
                Instructions:
              </Text>
              <VStack align="start" spacing={2}>
                <Text fontSize="xs" color={subtitleColor}>
                  • General rules and instructions, carefully
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • Ensure you review the instructions before
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • Primary & level Mathematics preparation.
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • Section A: Section A: Multiple Choice
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • Questions should you use data methods? No
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • Should you use tools available or not
                </Text>
                <Text fontSize="xs" color={subtitleColor}>
                  • answer for Each question.
                </Text>
              </VStack>
            </Box>

            {/* Action Buttons */}
            <VStack spacing={3}>
              <Button
                colorScheme="red"
                size="lg"
                width="full"
                onClick={() => handleStartExam('mock')}
                leftIcon={<FiPlay />}
              >
                Mock Exam
              </Button>
              <Button
                colorScheme="blue"
                variant="outline"
                size="lg"
                width="full"
                onClick={() => handleStartExam('prep')}
                leftIcon={<FiEdit />}
              >
                Exam Prep
              </Button>
              <Button
                colorScheme="green"
                size="lg"
                width="full"
                leftIcon={<FiPlay />}
              >
                Start
              </Button>
            </VStack>
          </VStack>
        </GridItem>

        {/* Main Content */}
        <GridItem p={8} bg={bgColor}>
          <Container maxW="4xl">
            <VStack spacing={8} align="stretch">
              {/* Welcome Header */}
              <Box textAlign="center">
                <Heading size="xl" color={textColor} mb={4}>
                  Welcome to IshuriExamsPrep Lite
                </Heading>
                <Text fontSize="lg" color={subtitleColor}>
                  Select your exam settings and choose an option:
                </Text>
              </Box>

              {/* Exam Type Information */}
              <VStack spacing={4} align="start">
                <HStack align="start" spacing={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>•</Text>
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                      Mock Exam: 
                      <Text as="span" fontWeight="normal" ml={2}>
                        The mock exam is for display purposes only. Users can navigate using the 
                        countdown timer, Next, and Previous buttons. Answers are not recorded—full solutions will 
                        be shown after the countdown ends.
                      </Text>
                    </Text>
                  </Box>
                </HStack>

                <HStack align="start" spacing={4}>
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>•</Text>
                  <Box>
                    <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                      Exam Prep: 
                      <Text as="span" fontWeight="normal" ml={2}>
                        Exam Prep will display an unlimited number of questions, followed by their 
                        corresponding answers.
                      </Text>
                    </Text>
                  </Box>
                </HStack>
              </VStack>

              {/* Feature Cards */}
              <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                {/* Timed Practice */}
                <Card bg={cardBg} borderLeft="4px" borderLeftColor="blue.400">
                  <CardBody>
                    <HStack spacing={4} mb={4}>
                      <Icon as={FiClock} color="blue.400" boxSize={6} />
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        Timed Practice
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={subtitleColor}>
                      Experience real exam conditions with our timed mock exams. Perfect for building confidence and 
                      improving time management skills.
                    </Text>
                  </CardBody>
                </Card>

                {/* Self-Paced Learning */}
                <Card bg={cardBg} borderLeft="4px" borderLeftColor="green.400">
                  <CardBody>
                    <HStack spacing={4} mb={4}>
                      <Icon as={FiBookOpen} color="green.400" boxSize={6} />
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        Self-Paced Learning
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={subtitleColor}>
                      Study at your own pace with unlimited access to questions and detailed explanations. Ideal for 
                      thorough understanding and concept mastery.
                    </Text>
                  </CardBody>
                </Card>

                {/* Comprehensive Coverage */}
                <Card bg={cardBg} borderLeft="4px" borderLeftColor="purple.400">
                  <CardBody>
                    <HStack spacing={4} mb={4}>
                      <Icon as={FiTarget} color="purple.400" boxSize={6} />
                      <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                        Comprehensive Coverage
                      </Text>
                    </HStack>
                    <Text fontSize="sm" color={subtitleColor}>
                      Access questions from multiple years and subjects. Our extensive database ensures you're well-
                      prepared for any exam scenario.
                    </Text>
                  </CardBody>
                </Card>
              </Grid>
            </VStack>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );

  return currentView === 'exam' ? renderExamInterface() : renderSettingsInterface();
};

export default ExamsPrepLite;
