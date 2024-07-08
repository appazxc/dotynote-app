import React from 'react';

import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

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
