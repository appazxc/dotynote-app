import { AbsoluteCenter, Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';

import { Layout } from 'desktop/components/Layout';

// Import CSS animations
import './LoginAnimations.css';

// Animated text with overflow effect - CSS only version
const AnimatedText: React.FC = () => {
  return (
    <Box
      position="absolute"
      top="1"
      left="2"
      zIndex={100}
    >
      <Box
        display="flex"
        flexDir="column"
      >
        <Box className="fade-in-up">
          <Box className="animated-gradient">
            [.dotynote]
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Component with central glow - CSS only version
const CentralGlow: React.FC = () => {
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      bg="black"
    >
      <AbsoluteCenter>
        {/* Центральное свечение с пульсацией - CSS only */}
        <Box className="glow-pulse" />
      </AbsoluteCenter>
    </Box>
  );
};

function Login() {
  return (
    <Layout>
      <Flex h="100vh" direction={{ base: 'column', md: 'row' }}>
        {/* Форма логина */}
        <AnimatedText />
        <Box
          w={{ base: '100%', md: '50%' }}
          display="flex"
          bg="white"
        >
          <Container maxW="md" pt="30vh">
            <LoginForm />
          </Container>
        </Box>
        {/* Анимированная половина с центральным свечением */}
        <Box 
          display={{ base: 'none', md: 'flex' }} 
          w={{ md: '50%' }} 
          bg="black"
          position="relative"
          overflow="hidden"
        >
          <CentralGlow />
        </Box>
      </Flex>
    </Layout>
  );
}

export default Login;
