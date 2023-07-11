import { Container } from '@chakra-ui/react';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { LoginForm } from 'shared/components/forms/LoginForm';

function Home() {
  return (
    <Layout>
      <Container pt="24" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export { Home };
