import { Box, Button, Container } from '@chakra-ui/react';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { useAppSelector } from 'shared/store/hooks';
import { selectToken } from 'shared/store/slices/authSlice';

function Home() {
  const hasToken = !!useAppSelector(selectToken);

  const renderedAppButton = React.useMemo(() => {
    return (
      <Box>
        <Button
          as={Link}
          to="/app"
          colorScheme="purple"
          width="full"
        >
          Open App
        </Button>
      </Box>
    );
  }, []);

  return (
    <Layout>
      <Container pt="36" maxW="md">
        {hasToken ? renderedAppButton : <LoginForm />}
      </Container>
    </Layout>
  );
}

export { Home };
