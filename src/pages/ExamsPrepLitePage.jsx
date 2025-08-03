import React from 'react';
import { Box } from '@chakra-ui/react';
import AppNavbar from '../components/AppNavbar';
import ExamsPrepLite from '../components/ExamsPrepLite';

const ExamsPrepLitePage = () => {
  return (
    <Box>
      <AppNavbar 
        appName="Ishuri ExamsPrep Lite" 
        appDescription="Basic exam preparation with practice questions and mock exams for all education levels."
        userPlan="Standard Plan"
        showBackButton={true}
        backTo="/apps"
      />
      <ExamsPrepLite />
    </Box>
  );
};

export default ExamsPrepLitePage;
