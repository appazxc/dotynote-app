import React from 'react';

import { Button, Container } from '@chakra-ui/react';

import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

export const Profile = React.memo(() => {
  return (
    <Layout header={<LayoutHeader left={<MobileLink to="/"><Logo p="2" /></MobileLink>} />}>
      <Container pt="24" maxW="md">
        profile
      </Container>
    </Layout>
  );
});
