import React from 'react';

import { Box, Heading, Text, Button, Center } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

export const NoteNotFound = () => {
  const navigate = useNavigate();

  return (
    <Center h="full">
      <Box
        textAlign="center"
        py={10}
        px={6}
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
        >
          404
        </Heading>
        <Text
          fontSize="18px"
          mt="3"
          mb="2"
        >
          Note Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The note you{"'"}re looking for does not seem to exist
        </Text>
        <Button
          colorScheme="brand"
          onClick={() => navigate({ to: '/' })}
        >
          Go to Home
        </Button>
      </Box>
    </Center>
  );
};

export default NoteNotFound;