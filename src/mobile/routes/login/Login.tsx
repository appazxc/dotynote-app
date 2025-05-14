import { Container } from '@chakra-ui/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';
import { MobileLink } from 'mobile/components/MobileLink';

function Login() {
  return (
    <Layout header={<LayoutHeader left={<MobileLink to="/"><Logo p="2" /></MobileLink>} />}>
      <Container pt="36" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
}

export default Login;
