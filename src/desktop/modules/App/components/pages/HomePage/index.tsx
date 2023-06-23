import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import router from 'desktop/routes/router';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column">
      HomePage
      of note
      <Button onClick={() => navigate('/note/1')}>Перейти в нот</Button>
      <Button onClick={() => router.navigate('/')}>Вернуться на главную страницу</Button>
    </Box>
  );
}
