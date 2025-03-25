import { Box, Container, Heading } from '@chakra-ui/react';

const NoteTemplates = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading as="h1" mb={6}>
          Шаблоны заметок
        </Heading>
        {/* Здесь будет список шаблонов заметок */}
      </Box>
    </Container>
  );
};

export default NoteTemplates; 