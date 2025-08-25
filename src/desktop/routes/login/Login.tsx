import { AbsoluteCenter, Box, Container, Flex } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';

import { Layout } from 'desktop/components/Layout';

// Animated text with overflow effect
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            ease: 'easeOut',
          }}
        >
          <motion.div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundImage: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', 
              textShadow: '0 0 10px rgba(0,0,0,0.3)',
              display: 'inline-block',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            [.dotynote]
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
};

// Component with central glow
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
        {/* Центральное свечение с пульсацией */}
        <motion.div
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: 'rgba(100, 100, 255, 0.04)',
          }}
          animate={{
            boxShadow: [
              '0 0 100px 50px rgba(100, 100, 255, 0.1)',
              '0 0 130px 65px rgba(100, 100, 255, 0.25)',
              '0 0 100px 50px rgba(100, 100, 255, 0.1)',
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
            times: [0, 0.5, 1],
          }}
        />
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
