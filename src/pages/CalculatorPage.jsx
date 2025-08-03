import React from 'react';
import { Box } from '@chakra-ui/react';
import Calculator from '../components/Calculator';

const CalculatorPage = () => {
  return (
    <Box minH="calc(100vh - 64px)" bg="gray.50">
      <Calculator />
    </Box>
  );
};

export default CalculatorPage;
