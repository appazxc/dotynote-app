import { Box, Container, Heading } from '@chakra-ui/react';

const PostTemplates = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading as="h1" mb={6}>
          Шаблоны постов
        </Heading>
        {/* Здесь будет список шаблонов постов */}
      </Box>
    </Container>
  );
};

export default PostTemplates; 