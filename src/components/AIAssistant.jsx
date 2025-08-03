import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Avatar,
  Container,
  useColorModeValue,
  Textarea,
  IconButton,
  Divider
} from '@chakra-ui/react';
import { FiSend, FiPlus } from 'react-icons/fi';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I help you with math today?",
      sender: 'ai',
      timestamp: 'less than a minute ago'
    },
    {
      id: 2,
      text: "I'm struggling with quadratic equations. Can you explain them?",
      sender: 'user',
      timestamp: 'less than a minute ago'
    },
    {
      id: 3,
      text: "Dear student, quadratic equations are in the form ax² + bx + c = 0. You can solve them using the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. Would you like me to walk through an example?",
      sender: 'ai',
      timestamp: 'less than a minute ago'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [chatHistory] = useState([
    { id: 1, title: 'Math Help', timestamp: 'less than a minute ago', active: true },
    { id: 2, title: 'History Questions', timestamp: 'less than a minute ago', active: false }
  ]);

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const chatBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const userMessageBg = useColorModeValue('blue.500', 'blue.600');
  const aiMessageBg = useColorModeValue('gray.100', 'gray.700');
  const activeChatBg = useColorModeValue('green.50', 'green.900');
  const activeChatBorder = useColorModeValue('green.200', 'green.600');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: 'just now'
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "I'm here to help! Let me think about your question...",
        sender: 'ai',
        timestamp: 'just now'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)">
      <Flex h="calc(100vh - 64px)">
        {/* Sidebar */}
        <Box
          w="280px"
          bg={sidebarBg}
          borderRight="1px"
          borderColor={borderColor}
          p={4}
          overflowY="auto"
          flexShrink={0}
        >
          <VStack spacing={4} align="stretch">
            {/* Header */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={2}>
                Ishuri AI Assistant
              </Text>
              <Button
                leftIcon={<FiPlus />}
                size="sm"
                colorScheme="green"
                variant="solid"
                w="full"
              >
                New Chat
              </Button>
            </Box>

            <Divider />

            {/* Chat History */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color={mutedTextColor} mb={3}>
                Chat History
              </Text>
              <VStack spacing={2} align="stretch">
                {chatHistory.map((chat) => (
                  <Box
                    key={chat.id}
                    p={3}
                    borderRadius="md"
                    bg={chat.active ? activeChatBg : 'transparent'}
                    border="1px"
                    borderColor={chat.active ? activeChatBorder : 'transparent'}
                    cursor="pointer"
                    _hover={{ bg: chat.active ? activeChatBg : 'gray.50' }}
                  >
                    <Text fontSize="sm" fontWeight="medium" color={textColor}>
                      {chat.title}
                    </Text>
                    <Text fontSize="xs" color={mutedTextColor}>
                      {chat.timestamp}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Main Chat Area */}
        <Flex flex={1} direction="column">
          {/* Chat Messages */}
          <Box flex={1} overflowY="auto" p={6}>
            <Container maxW="4xl">
              <VStack spacing={6} align="stretch">
                {messages.map((message) => (
                  <Flex
                    key={message.id}
                    justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    <HStack
                      spacing={3}
                      maxW="70%"
                      flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                    >
                      <Avatar
                        size="sm"
                        bg={message.sender === 'ai' ? 'green.500' : 'blue.500'}
                        color="white"
                        name={message.sender === 'ai' ? '1' : 'You'}
                        fontSize="xs"
                      />
                      <Box>
                        <Box
                          bg={message.sender === 'user' ? userMessageBg : aiMessageBg}
                          color={message.sender === 'user' ? 'white' : textColor}
                          px={4}
                          py={3}
                          borderRadius="lg"
                          borderTopLeftRadius={message.sender === 'ai' ? 'sm' : 'lg'}
                          borderTopRightRadius={message.sender === 'user' ? 'sm' : 'lg'}
                        >
                          <Text fontSize="sm" lineHeight="1.5">
                            {message.text}
                          </Text>
                        </Box>
                        <Text
                          fontSize="xs"
                          color={mutedTextColor}
                          mt={1}
                          textAlign={message.sender === 'user' ? 'right' : 'left'}
                        >
                          {message.timestamp}
                        </Text>
                      </Box>
                    </HStack>
                  </Flex>
                ))}
              </VStack>
            </Container>
          </Box>

          {/* Input Area */}
          <Box
            bg={chatBg}
            borderTop="1px"
            borderColor={borderColor}
            p={4}
          >
            <Container maxW="4xl">
              <HStack spacing={3}>
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  resize="none"
                  minH="40px"
                  maxH="120px"
                  border="1px"
                  borderColor={borderColor}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px #3182ce'
                  }}
                  bg={useColorModeValue('white', 'gray.700')}
                />
                <IconButton
                  icon={<FiSend />}
                  colorScheme="blue"
                  onClick={handleSendMessage}
                  isDisabled={!inputValue.trim()}
                  aria-label="Send message"
                  size="md"
                />
              </HStack>
            </Container>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AIAssistant;
