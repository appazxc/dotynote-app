import { Container } from '@chakra-ui/react';
import { Layout, LayoutHeader } from 'mobile/components/Layout';
import React from 'react';
import { Logo } from 'shared/components/Logo';
import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <Layout header={<LayoutHeader showBackButton={false} left={<Link to="/"><Logo p="2" /></Link>} />}>
      <Container pt="24" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export { Login };
