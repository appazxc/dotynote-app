import React from 'react';

import { Container } from '@chakra-ui/react';

import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

export const Settings = React.memo(() => {
  return (
    <Layout header={<LayoutHeader left={<MobileLink to="/"><Logo p="2" /></MobileLink>} />}>
      <Container pt="24" maxW="md">
        settings
      </Container>
    </Layout>
  );
});
