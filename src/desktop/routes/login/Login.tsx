import { Container } from '@chakra-ui/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function Login() {
  return (
    <Layout header={<LayoutHeader left={<DesktopLink to="/"><Logo p="2" /></DesktopLink>} />}>
      <Container pt="36" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export default Login;
