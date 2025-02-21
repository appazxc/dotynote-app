import { Container } from '@chakra-ui/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm';
import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

const Home = React.memo(() => {
  return (
    <Layout header={<LayoutHeader left={<MobileLink to="/"><Logo p="2" /></MobileLink>} />}>
      <Container pt="24" maxW="md">
        <LoginForm />
      </Container>
    </Layout>
  );
});

export default Home;