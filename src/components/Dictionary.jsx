import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Flex,
  InputGroup,
  InputRightElement,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  useToast
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentWord, setCurrentWord] = useState(null);
  const [searchHistory, setSearchHistory] = useState(['book', 'water', 'learn']);
  const [activeLanguage, setActiveLanguage] = useState(0); // 0: English, 1: Français, 2: Kinyarwanda, 3: Kiswahili
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('blue.500', 'blue.300');

  // Sample dictionary data
  const dictionaryData = {
    book: {
      english: {
        word: 'book',
        pronunciation: '/bʊk/',
        definition: 'A written or printed work consisting of pages bound together',
        example: 'She read a book about history.',
        relatedWords: ['booklet', 'bookish', 'bookshelf']
      },
      français: {
        word: 'livre',
        definition: 'Un ouvrage écrit ou imprimé composé de pages reliées ensemble'
      },
      kinyarwanda: {
        word: 'igitabo',
        definition: 'Ibinyandiko byanditswe cyangwa bicapwe bikomatanyije hamwe'
      },
      kiswahili: {
        word: 'kitabu',
        definition: 'Kazi iliyoandikwa au kuchapishwa inayojumuisha kurasa zilizofungwa pamoja'
      }
    },
    water: {
      english: {
        word: 'water',
        pronunciation: '/ˈwɔːtər/',
        definition: 'A colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain',
        example: 'Please drink more water.',
        relatedWords: ['watery', 'waterfall', 'watershed']
      },
      français: {
        word: 'eau',
        definition: 'Liquide incolore, transparent et inodore qui forme les mers, les lacs, les rivières et la pluie'
      },
      kinyarwanda: {
        word: 'amazi',
        definition: 'Amazi ni ibintu bidafite ibara, biraboneka, bidafite impumuro bikora inyanja, ibiyaga, inzuzi n\'imvura'
      },
      kiswahili: {
        word: 'maji',
        definition: 'Kioevu kisicho na rangi, kinachoonyesha na kisicho na harufu kinachoundwa bahari, maziwa, mito na mvua'
      }
    },
    learn: {
      english: {
        word: 'learn',
        pronunciation: '/lɜːrn/',
        definition: 'To gain knowledge or skill by studying, practicing, being taught, or experiencing something',
        example: 'Children learn quickly.',
        relatedWords: ['learner', 'learning', 'learned']
      },
      français: {
        word: 'apprendre',
        definition: 'Acquérir des connaissances ou des compétences en étudiant, en pratiquant, en étant enseigné ou en expérimentant quelque chose'
      },
      kinyarwanda: {
        word: 'kwiga',
        definition: 'Kubona ubumenyi cyangwa ubushobozi bwo gukora ikintu mu kwiga, gukora, kwigishwa cyangwa guhura n\'ikintu'
      },
      kiswahili: {
        word: 'kujifunza',
        definition: 'Kupata maarifa au ujuzi kwa kusoma, kufanya mazoezi, kufundishwa au kupitia uzoefu'
      }
    }
  };

  const languages = ['English', 'Français', 'Kinyarwanda', 'Kiswahili'];
  const languageKeys = ['english', 'français', 'kinyarwanda', 'kiswahili'];

  useEffect(() => {
    // Set default word to 'book'
    setCurrentWord(dictionaryData.book);
    setSearchTerm('book');
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      toast({
        title: 'Please enter a word to search',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (dictionaryData[term]) {
      setCurrentWord(dictionaryData[term]);
      
      // Add to search history if not already present
      if (!searchHistory.includes(term)) {
        setSearchHistory(prev => [term, ...prev.slice(0, 9)]); // Keep last 10 searches
      }
    } else {
      toast({
        title: 'Word not found',
        description: 'Try searching for: book, water, or learn',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleHistoryClick = (word) => {
    setSearchTerm(word);
    setCurrentWord(dictionaryData[word]);
  };

  const handleRelatedWordClick = (word) => {
    setSearchTerm(word);
    if (dictionaryData[word]) {
      setCurrentWord(dictionaryData[word]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getCurrentLanguageData = () => {
    if (!currentWord) return null;
    const langKey = languageKeys[activeLanguage];
    return currentWord[langKey];
  };

  const currentData = getCurrentLanguageData();

  return (
    <Box bg={bgColor} minH="calc(100vh - 64px)" py={6}>
      <Container maxW="6xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Box textAlign="center" py={4}>
            <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={2}>
              Multilingual Dictionary
            </Text>
            <Text fontSize="lg" color={subtitleColor}>
              Discover words in multiple languages
            </Text>
          </Box>

          {/* Search Bar */}
          <Card bg={cardBg} shadow="sm" borderColor={borderColor}>
            <CardBody>
              <HStack spacing={4}>
                <InputGroup flex={1}>
                  <Input
                    placeholder="Enter a word to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="lg"
                    borderColor={borderColor}
                    _focus={{ borderColor: accentColor }}
                  />
                  <InputRightElement height="48px">
                    <FiSearch color={subtitleColor} />
                  </InputRightElement>
                </InputGroup>
                <Button
                  onClick={handleSearch}
                  colorScheme="blue"
                  size="lg"
                  px={8}
                  leftIcon={<FiSearch />}
                >
                  Search
                </Button>
              </HStack>
            </CardBody>
          </Card>

          {/* Language Tabs and Word Display */}
          {currentWord && (
            <Card bg={cardBg} shadow="sm" borderColor={borderColor}>
              <CardBody>
                <Tabs 
                  index={activeLanguage} 
                  onChange={setActiveLanguage}
                  colorScheme="blue"
                >
                  <TabList>
                    {languages.map((lang, index) => (
                      <Tab key={index} fontWeight="medium">
                        {lang}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {languages.map((lang, index) => (
                      <TabPanel key={index} px={0} py={6}>
                        {currentData && (
                          <VStack align="start" spacing={4}>
                            {/* Word and Pronunciation */}
                            <VStack align="start" spacing={2}>
                              <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                                {currentData.word}
                              </Text>
                              {currentData.pronunciation && (
                                <Text fontSize="md" color={subtitleColor} fontStyle="italic">
                                  {currentData.pronunciation}
                                </Text>
                              )}
                            </VStack>

                            {/* Definition */}
                            <Box>
                              <Text fontSize="md" color={textColor} lineHeight="1.6">
                                {currentData.definition}
                              </Text>
                            </Box>

                            {/* Example (only for English) */}
                            {currentData.example && (
                              <Box>
                                <Text fontSize="sm" color={subtitleColor} fontStyle="italic">
                                  "{currentData.example}"
                                </Text>
                              </Box>
                            )}

                            {/* Related Words (only for English) */}
                            {currentData.relatedWords && currentData.relatedWords.length > 0 && (
                              <Box>
                                <Text fontSize="sm" fontWeight="semibold" color={textColor} mb={2}>
                                  Related Words:
                                </Text>
                                <HStack spacing={2} flexWrap="wrap">
                                  {currentData.relatedWords.map((word, idx) => (
                                    <Badge
                                      key={idx}
                                      colorScheme="blue"
                                      variant="subtle"
                                      cursor="pointer"
                                      _hover={{ bg: 'blue.100' }}
                                      onClick={() => handleRelatedWordClick(word)}
                                    >
                                      {word}
                                    </Badge>
                                  ))}
                                </HStack>
                              </Box>
                            )}
                          </VStack>
                        )}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
          )}

          {/* Search History */}
          <Card bg={cardBg} shadow="sm" borderColor={borderColor}>
            <CardBody>
              <VStack align="start" spacing={4}>
                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                  Search History:
                </Text>
                <HStack spacing={2} flexWrap="wrap">
                  {searchHistory.map((word, index) => (
                    <Badge
                      key={index}
                      colorScheme="gray"
                      variant="subtle"
                      cursor="pointer"
                      _hover={{ bg: 'gray.200' }}
                      onClick={() => handleHistoryClick(word)}
                      size="md"
                      px={3}
                      py={1}
                    >
                      {word}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dictionary;
