import React from 'react';

import { Container } from '@chakra-ui/react';

import { SettingsContent } from 'shared/modules/settings/SettingsContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const Settings = React.memo(() => {
  return (
    <Layout header={<LayoutHeader showBackButton title="Settings" />}>
      <Container pt="4" maxW="md">
        <SettingsContent />
      </Container>
    </Layout>
  );
});
