import { Container } from '@chakra-ui/react';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { LoginForm } from 'shared/components/forms/LoginForm';
import { useAppDispatch } from 'shared/state/hooks';

function Home() {
  const dispatch = useAppDispatch();

  const handleSubmit = React.useCallback(({ email, code }) => {
    console.log('submit', email, code);
  }, []);

  return (
    <Layout>
      <Container pt="24" maxW="md">
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </Layout>
  );
}

export default Home;
