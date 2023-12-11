import React from 'react';

import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

function Home() {
  return (
    <Layout header={<LayoutHeader showBackButton={false} left={<Link to="/"><Logo p="2" /></Link>} />}>
      <Container pt="24" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export { Home };
