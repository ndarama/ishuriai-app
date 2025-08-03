import React, { useState, useEffect, useCallback } from 'react';
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
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  FormLabel,
  Select,
  Badge,
  Tooltip,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { 
  FiCopy, 
  FiRefreshCw, 
  FiDelete, 
  FiArrowLeft,
  FiInfo
} from 'react-icons/fi';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  
  // Scientific calculator states
  const [angleMode, setAngleMode] = useState('deg'); // 'deg', 'rad', 'grad'
  const [isScientific, setIsScientific] = useState(false);
  
  // Unit converter states
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [unitCategory, setUnitCategory] = useState('length');

  const toast = useToast();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const displayBg = useColorModeValue('gray.100', 'gray.700');
  const numberBtnColor = useColorModeValue('gray.200', 'gray.600');
  const operatorBtnColor = useColorModeValue('blue.500', 'blue.400');
  const specialBtnColor = useColorModeValue('orange.500', 'orange.400');

  // Unit conversion data
  const unitConversions = {
    length: {
      m: { name: 'Meters', factor: 1 },
      cm: { name: 'Centimeters', factor: 100 },
      mm: { name: 'Millimeters', factor: 1000 },
      km: { name: 'Kilometers', factor: 0.001 },
      in: { name: 'Inches', factor: 39.3701 },
      ft: { name: 'Feet', factor: 3.28084 },
      yd: { name: 'Yards', factor: 1.09361 },
      mi: { name: 'Miles', factor: 0.000621371 }
    },
    weight: {
      kg: { name: 'Kilograms', factor: 1 },
      g: { name: 'Grams', factor: 1000 },
      lb: { name: 'Pounds', factor: 2.20462 },
      oz: { name: 'Ounces', factor: 35.274 },
      ton: { name: 'Metric Tons', factor: 0.001 }
    },
    temperature: {
      c: { name: 'Celsius', factor: 1 },
      f: { name: 'Fahrenheit', factor: 1 },
      k: { name: 'Kelvin', factor: 1 }
    },
    area: {
      m2: { name: 'Square Meters', factor: 1 },
      cm2: { name: 'Square Centimeters', factor: 10000 },
      km2: { name: 'Square Kilometers', factor: 0.000001 },
      ft2: { name: 'Square Feet', factor: 10.7639 },
      in2: { name: 'Square Inches', factor: 1550 },
      ac: { name: 'Acres', factor: 0.000247105 }
    },
    volume: {
      l: { name: 'Liters', factor: 1 },
      ml: { name: 'Milliliters', factor: 1000 },
      gal: { name: 'Gallons (US)', factor: 0.264172 },
      qt: { name: 'Quarts (US)', factor: 1.05669 },
      pt: { name: 'Pints (US)', factor: 2.11338 },
      fl_oz: { name: 'Fluid Ounces (US)', factor: 33.814 },
      m3: { name: 'Cubic Meters', factor: 0.001 }
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (['+', '-', '*', '/'].includes(key)) {
        inputOperation(key);
      } else if (key === 'Enter' || key === '=') {
        calculate();
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      } else if (key === 'Backspace') {
        backspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const inputNumber = useCallback((num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const inputOperation = useCallback((nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation[operation](currentValue, inputValue);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      setHistory(prev => [...prev, `${currentValue} ${operation} ${inputValue} = ${newValue}`]);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const performCalculation = {
    '+': (firstValue, secondValue) => firstValue + secondValue,
    '-': (firstValue, secondValue) => firstValue - secondValue,
    '*': (firstValue, secondValue) => firstValue * secondValue,
    '/': (firstValue, secondValue) => firstValue / secondValue,
    '=': (firstValue, secondValue) => secondValue,
    'sqrt': (value) => Math.sqrt(value),
    'square': (value) => value * value,
    'cube': (value) => value * value * value,
    'sin': (value) => Math.sin(angleMode === 'deg' ? value * Math.PI / 180 : value),
    'cos': (value) => Math.cos(angleMode === 'deg' ? value * Math.PI / 180 : value),
    'tan': (value) => Math.tan(angleMode === 'deg' ? value * Math.PI / 180 : value),
    'log': (value) => Math.log10(value),
    'ln': (value) => Math.log(value),
    'exp': (value) => Math.exp(value),
    'pow': (base, exponent) => Math.pow(base, exponent),
    'factorial': (value) => {
      if (value < 0 || !Number.isInteger(value)) return NaN;
      if (value === 0 || value === 1) return 1;
      let result = 1;
      for (let i = 2; i <= value; i++) {
        result *= i;
      }
      return result;
    }
  };

  const calculate = useCallback(() => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = performCalculation[operation](previousValue, inputValue);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
      
      // Add to history
      setHistory(prev => [...prev, `${previousValue} ${operation} ${inputValue} = ${newValue}`]);
    }
  }, [display, previousValue, operation]);

  const performScientificOperation = (op) => {
    const value = parseFloat(display);
    let result;

    try {
      result = performCalculation[op](value);
      setDisplay(String(result));
      setHistory(prev => [...prev, `${op}(${value}) = ${result}`]);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    toast({
      title: 'Copied to clipboard',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: 'History cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  // Memory operations
  const memoryStore = () => {
    setMemory(parseFloat(display));
    toast({
      title: 'Value stored in memory',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const memoryRecall = () => {
    setDisplay(String(memory));
  };

  const memoryClear = () => {
    setMemory(0);
    toast({
      title: 'Memory cleared',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
  };

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display));
  };

  // Unit conversion
  const convertUnits = (value, fromUnit, toUnit, category) => {
    if (!value || isNaN(value)) return '';
    
    const conversions = unitConversions[category];
    
    if (category === 'temperature') {
      // Special handling for temperature
      let celsius = value;
      if (fromUnit === 'f') {
        celsius = (value - 32) * 5/9;
      } else if (fromUnit === 'k') {
        celsius = value - 273.15;
      }
      
      if (toUnit === 'c') return celsius;
      if (toUnit === 'f') return (celsius * 9/5) + 32;
      if (toUnit === 'k') return celsius + 273.15;
    } else {
      // Standard conversion through base unit
      const baseValue = value / conversions[fromUnit].factor;
      return baseValue * conversions[toUnit].factor;
    }
  };

  useEffect(() => {
    if (fromValue && !isNaN(fromValue)) {
      const converted = convertUnits(parseFloat(fromValue), fromUnit, toUnit, unitCategory);
      setToValue(converted.toString());
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, unitCategory]);

  return (
    <Box>
      <Container maxW="6xl" py={8}>
        <VStack spacing={6} align="stretch">
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Basic</Tab>
            <Tab>Scientific</Tab>
            <Tab>Converter</Tab>
            <Tab>History</Tab>
          </TabList>

          <TabPanels>
            {/* Basic Calculator */}
            <TabPanel>
              <VStack spacing={4}>
                {/* Display */}
                <Box
                  w="100%"
                  maxW="400px"
                  p={4}
                  bg={displayBg}
                  borderRadius="lg"
                  position="relative"
                >
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm" color="gray.500">
                      {operation && previousValue !== null && 
                        `${previousValue} ${operation}`
                      }
                    </Text>
                    <HStack>
                      {memory !== 0 && (
                        <Badge colorScheme="green" variant="subtle">
                          M: {memory}
                        </Badge>
                      )}
                      <Tooltip label="Copy to clipboard">
                        <IconButton
                          icon={<FiCopy />}
                          size="sm"
                          variant="ghost"
                          onClick={copyToClipboard}
                        />
                      </Tooltip>
                    </HStack>
                  </HStack>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="right"
                    fontFamily="mono"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {display}
                  </Text>
                </Box>

                {/* Memory buttons */}
                <HStack spacing={2}>
                  <Button size="sm" onClick={memoryClear}>MC</Button>
                  <Button size="sm" onClick={memoryRecall}>MR</Button>
                  <Button size="sm" onClick={memoryStore}>MS</Button>
                  <Button size="sm" onClick={memoryAdd}>M+</Button>
                  <Button size="sm" onClick={memorySubtract}>M-</Button>
                </HStack>

                {/* Calculator buttons */}
                <Grid templateColumns="repeat(4, 1fr)" gap={2} maxW="400px">
                  <Button
                    bg={specialBtnColor}
                    color="white"
                    onClick={clear}
                    _hover={{ bg: useColorModeValue('orange.600', 'orange.500') }}
                  >
                    AC
                  </Button>
                  <Button
                    bg={specialBtnColor}
                    color="white"
                    onClick={backspace}
                    _hover={{ bg: useColorModeValue('orange.600', 'orange.500') }}
                  >
                    ⌫
                  </Button>
                  <Button
                    bg={operatorBtnColor}
                    color="white"
                    onClick={() => inputOperation('/')}
                    _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
                  >
                    ÷
                  </Button>
                  <Button
                    bg={operatorBtnColor}
                    color="white"
                    onClick={() => inputOperation('*')}
                    _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
                  >
                    ×
                  </Button>

                  {[7, 8, 9].map(num => (
                    <Button
                      key={num}
                      bg={numberBtnColor}
                      onClick={() => inputNumber(num)}
                      _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    bg={operatorBtnColor}
                    color="white"
                    onClick={() => inputOperation('-')}
                    _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
                  >
                    −
                  </Button>

                  {[4, 5, 6].map(num => (
                    <Button
                      key={num}
                      bg={numberBtnColor}
                      onClick={() => inputNumber(num)}
                      _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
                    >
                      {num}
                    </Button>
                  ))}
                  <Button
                    bg={operatorBtnColor}
                    color="white"
                    onClick={() => inputOperation('+')}
                    _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
                  >
                    +
                  </Button>

                  {[1, 2, 3].map(num => (
                    <Button
                      key={num}
                      bg={numberBtnColor}
                      onClick={() => inputNumber(num)}
                      _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
                    >
                      {num}
                    </Button>
                  ))}
                  <GridItem rowSpan={2}>
                    <Button
                      h="100%"
                      bg={operatorBtnColor}
                      color="white"
                      onClick={calculate}
                      _hover={{ bg: useColorModeValue('blue.600', 'blue.500') }}
                    >
                      =
                    </Button>
                  </GridItem>

                  <GridItem colSpan={2}>
                    <Button
                      w="100%"
                      bg={numberBtnColor}
                      onClick={() => inputNumber(0)}
                      _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
                    >
                      0
                    </Button>
                  </GridItem>
                  <Button
                    bg={numberBtnColor}
                    onClick={inputDecimal}
                    _hover={{ bg: useColorModeValue('gray.300', 'gray.500') }}
                  >
                    .
                  </Button>
                </Grid>
              </VStack>
            </TabPanel>

            {/* Scientific Calculator */}
            <TabPanel>
              <VStack spacing={4}>
                {/* Display (same as basic) */}
                <Box
                  w="100%"
                  maxW="500px"
                  p={4}
                  bg={displayBg}
                  borderRadius="lg"
                >
                  <HStack justify="space-between" mb={2}>
                    <HStack>
                      <Text fontSize="sm" color="gray.500">
                        Angle: {angleMode.toUpperCase()}
                      </Text>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          const modes = ['deg', 'rad', 'grad'];
                          const currentIndex = modes.indexOf(angleMode);
                          setAngleMode(modes[(currentIndex + 1) % modes.length]);
                        }}
                      >
                        {angleMode}
                      </Button>
                    </HStack>
                    <IconButton
                      icon={<FiCopy />}
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                    />
                  </HStack>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    textAlign="right"
                    fontFamily="mono"
                  >
                    {display}
                  </Text>
                </Box>

                {/* Scientific functions */}
                <Grid templateColumns="repeat(5, 1fr)" gap={2} maxW="500px">
                  <Button onClick={() => performScientificOperation('sin')}>sin</Button>
                  <Button onClick={() => performScientificOperation('cos')}>cos</Button>
                  <Button onClick={() => performScientificOperation('tan')}>tan</Button>
                  <Button onClick={() => performScientificOperation('log')}>log</Button>
                  <Button onClick={() => performScientificOperation('ln')}>ln</Button>
                  
                  <Button onClick={() => performScientificOperation('sqrt')}>√</Button>
                  <Button onClick={() => performScientificOperation('square')}>x²</Button>
                  <Button onClick={() => performScientificOperation('cube')}>x³</Button>
                  <Button onClick={() => performScientificOperation('exp')}>eˣ</Button>
                  <Button onClick={() => performScientificOperation('factorial')}>x!</Button>
                  
                  <Button onClick={() => inputNumber('(')}>(</Button>
                  <Button onClick={() => inputNumber(')')}>)</Button>
                  <Button onClick={() => inputNumber(Math.PI.toFixed(8))}>π</Button>
                  <Button onClick={() => inputNumber(Math.E.toFixed(8))}>e</Button>
                  <Button onClick={() => inputOperation('^')}>xʸ</Button>
                </Grid>

                {/* Standard calculator buttons (condensed) */}
                <Grid templateColumns="repeat(4, 1fr)" gap={2} maxW="400px">
                  <Button onClick={clear}>C</Button>
                  <Button onClick={backspace}>⌫</Button>
                  <Button onClick={() => inputOperation('/')}>/</Button>
                  <Button onClick={() => inputOperation('*')}>×</Button>
                  
                  {[7, 8, 9].map(num => (
                    <Button key={num} onClick={() => inputNumber(num)}>{num}</Button>
                  ))}
                  <Button onClick={() => inputOperation('-')}>-</Button>
                  
                  {[4, 5, 6].map(num => (
                    <Button key={num} onClick={() => inputNumber(num)}>{num}</Button>
                  ))}
                  <Button onClick={() => inputOperation('+')}>+</Button>
                  
                  {[1, 2, 3].map(num => (
                    <Button key={num} onClick={() => inputNumber(num)}>{num}</Button>
                  ))}
                  <GridItem rowSpan={1}>
                    <Button onClick={calculate}>=</Button>
                  </GridItem>
                  
                  <GridItem colSpan={2}>
                    <Button w="100%" onClick={() => inputNumber(0)}>0</Button>
                  </GridItem>
                  <Button onClick={inputDecimal}>.</Button>
                </Grid>
              </VStack>
            </TabPanel>

            {/* Unit Converter */}
            <TabPanel>
              <VStack spacing={6} align="stretch" maxW="600px" mx="auto">
                <FormControl>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={unitCategory}
                    onChange={(e) => {
                      setUnitCategory(e.target.value);
                      const units = Object.keys(unitConversions[e.target.value]);
                      setFromUnit(units[0]);
                      setToUnit(units[1] || units[0]);
                    }}
                  >
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                  </Select>
                </FormControl>

                <Grid templateColumns="1fr auto 1fr" gap={4} alignItems="end">
                  <VStack>
                    <FormControl>
                      <FormLabel>From</FormLabel>
                      <Select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                      >
                        {Object.entries(unitConversions[unitCategory]).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </Select>
                    </FormControl>
                    <Input
                      type="number"
                      value={fromValue}
                      onChange={(e) => setFromValue(e.target.value)}
                      placeholder="Enter value"
                    />
                  </VStack>

                  <IconButton
                    icon={<FiRefreshCw />}
                    onClick={() => {
                      const temp = fromUnit;
                      setFromUnit(toUnit);
                      setToUnit(temp);
                      setFromValue(toValue);
                    }}
                    aria-label="Swap units"
                  />

                  <VStack>
                    <FormControl>
                      <FormLabel>To</FormLabel>
                      <Select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                      >
                        {Object.entries(unitConversions[unitCategory]).map(([key, unit]) => (
                          <option key={key} value={key}>{unit.name}</option>
                        ))}
                      </Select>
                    </FormControl>
                    <Input
                      type="number"
                      value={toValue}
                      readOnly
                      placeholder="Result"
                      bg={displayBg}
                    />
                  </VStack>
                </Grid>
              </VStack>
            </TabPanel>

            {/* History */}
            <TabPanel>
              <VStack spacing={4} align="stretch" maxW="500px" mx="auto">
                <HStack justify="space-between">
                  <Text fontSize="lg" fontWeight="bold">Calculation History</Text>
                  <Button
                    leftIcon={<FiDelete />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    onClick={clearHistory}
                    isDisabled={history.length === 0}
                  >
                    Clear History
                  </Button>
                </HStack>
                
                <Divider />
                
                {history.length === 0 ? (
                  <Text textAlign="center" color="gray.500" py={8}>
                    No calculations yet. Start calculating to see your history here.
                  </Text>
                ) : (
                  <VStack spacing={2} align="stretch" maxH="400px" overflowY="auto">
                    {history.slice().reverse().map((calculation, index) => (
                      <Box
                        key={index}
                        p={3}
                        bg={bgColor}
                        borderRadius="md"
                        border="1px"
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                        cursor="pointer"
                        onClick={() => {
                          const result = calculation.split(' = ')[1];
                          setDisplay(result);
                        }}
                      >
                        <Text fontFamily="mono" fontSize="sm">
                          {calculation}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                )}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Usage Instructions */}
        <Box
          p={4}
          bg={useColorModeValue('blue.50', 'blue.900')}
          borderRadius="lg"
          borderLeft="4px"
          borderColor="blue.500"
        >
          <HStack mb={2}>
            <FiInfo />
            <Text fontWeight="bold">Quick Tips</Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            • Use keyboard for quick input (numbers, +, -, *, /, Enter for =, Escape for clear)
            • Click on history items to use previous results
            • Memory functions: MC (clear), MR (recall), MS (store), M+ (add), M- (subtract)
            • Scientific mode includes trigonometric functions, logarithms, and more
            • Unit converter supports length, weight, temperature, area, and volume conversions
          </Text>
        </Box>
      </VStack>
    </Container>
    </Box>
  );
};

export default Calculator;
