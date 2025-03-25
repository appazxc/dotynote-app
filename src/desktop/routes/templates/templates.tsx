import { Box, Container, Heading, SimpleGrid, Text, Card } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { FiFileText, FiEdit } from 'react-icons/fi';

const TemplateCard = ({ title, icon: Icon, to }: { title: string; icon: any; to: string }) => {
  return (
    <Link to={to}>
      <Card.Root
        as="article"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{ transform: 'translateY(-2px)' }}
        role="group"
        tabIndex={0}
      >
        <Card.Body
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={6}
        >
          <Icon size={40} />
          <Text
            fontSize="xl"
            mt={4}
            fontWeight="medium"
          >
            {title}
          </Text>
        </Card.Body>
      </Card.Root>
    </Link>
  );
};

const Templates = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Box>
        <Heading as="h1" mb={6}>
          Шаблоны
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 2 }} gap={6}>
          <TemplateCard
            title="Note templates"
            icon={FiFileText}
            to="/app/templates/notes"
          />
          <TemplateCard
            title="Post templates"
            icon={FiEdit}
            to="/app/templates/posts"
          />
        </SimpleGrid>
      </Box>
    </Container>
  );
};

export default Templates; 