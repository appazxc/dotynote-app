import { Container } from '@chakra-ui/react';
import { Layout, LayoutHeader } from 'desktop/components/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from 'shared/components/Logo';
import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';

function Login() {
  return (
    <Layout header={<LayoutHeader left={<Link to="/"><Logo p="2" /></Link>} />}>
      <Container pt="36" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export { Login };
