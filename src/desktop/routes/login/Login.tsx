import { AbsoluteCenter, Box, Container, Flex, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useEffect, useState, useRef } from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';

import { Layout } from 'desktop/components/Layout';

// Интерфейсы для анимации
interface Circle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface ExpandingCircleProps {
  color: string;
  size: number;
  x: number;
  y: number;
  onComplete: () => void;
}

// Компонент анимированного расширяющегося круга
const ExpandingCircle: React.FC<ExpandingCircleProps> = ({ color, size, x, y, onComplete }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={`${x}-${y}-${Date.now()}`}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          backgroundColor: 'transparent',
          borderRadius: '50%',
          border: `2px solid ${color}`,
          zIndex: 1,
        }}
        initial={{ 
          width: 0,
          height: 0,
          opacity: 0.8,
          x: '-50%',
          y: '-50%',
        }}
        animate={{ 
          width: size,
          height: size,
          opacity: 0,
          x: '-50%',
          y: '-50%',
        }}
        transition={{ 
          duration: 2.5,
          ease: 'easeOut',
        }}
        onAnimationComplete={onComplete}
      />
    </AnimatePresence>
  );
};

// Анимированный текст с эффектом переливания
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

// Контейнер с пульсирующими кругами
const PulsingCirclesContainer: React.FC = () => {
  const [circles, setCircles] = useState<Circle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Цветовая палитра для кругов
  const colors = [
    '#ff595e', // Красный
    '#ffca3a', // Желтый
    '#8ac926', // Зеленый
    '#1982c4', // Синий
    '#6a4c93', // Фиолетовый
    '#f15bb5', // Розовый
    '#00bbf9', // Голубой
    '#00f5d4', // Бирюзовый
  ];
  
  // Функция для создания нового круга
  const createCircle = () => {
    const x = Math.random() * 100; // Случайная позиция по X (в процентах)
    const y = Math.random() * 100; // Случайная позиция по Y
    const size = 150 + Math.random() * 250; // Случайный размер от 150 до 400px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const id = Date.now() + Math.random();
    
    // Добавляем новый круг
    setCircles(prevCircles => [...prevCircles, { id, x, y, size, color }]);
    
    // Добавляем случайные небольшие круги вблизи основного
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const smallSize = 50 + Math.random() * 100;
        const offsetX = x + (Math.random() * 20 - 10);
        const offsetY = y + (Math.random() * 20 - 10);
        const smallId = id + 0.1;
        
        setCircles(prevCircles => [...prevCircles, { 
          id: smallId, 
          x: offsetX, 
          y: offsetY, 
          size: smallSize, 
          color,
        }]);
      }, 300);
    }
  };
  
  // Функция для удаления круга по ID
  const removeCircle = (id: number) => {
    setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
  };
  
  // Запускаем интервал для создания новых кругов
  useEffect(() => {
    // Сразу создаем первый круг
    createCircle();
    
    // Запускаем интервал для создания новых кругов
    intervalRef.current = setInterval(() => {
      // Небольшая рандомизация интервала
      const randomDelay = Math.random() * 2000;
      setTimeout(createCircle, randomDelay);
    }, 3000); // Примерно каждые 3-5 секунд
    
    // Очистка при размонтировании
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      bg="black"
    >
      {/* Фоновые точки */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.2}
        backgroundImage="radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)"
        backgroundSize="20px 20px"
      />
      
      {/* Пульсирующие круги */}
      {circles.map((circle) => (
        <ExpandingCircle
          key={circle.id}
          x={circle.x}
          y={circle.y}
          size={circle.size}
          color={circle.color}
          onComplete={() => removeCircle(circle.id)}
        />
      ))}
      
      {/* Центральное свечение */}
      <Box
        position="absolute"
        left="50%"
        top="50%"
        width="150px"
        height="150px"
        borderRadius="50%"
        bg="rgba(100, 100, 255, 0.05)"
        transform="translate(-50%, -50%)"
        boxShadow="0 0 120px 60px rgba(100, 100, 255, 0.15)"
      />
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
        {/* Анимированная половина с пульсирующими кругами */}
        <Box 
          display={{ base: 'none', md: 'flex' }} 
          w={{ md: '50%' }} 
          bg="black"
          position="relative"
          overflow="hidden"
        >
          <PulsingCirclesContainer />
        </Box>
      </Flex>
    </Layout>
  );
}

export default Login;
