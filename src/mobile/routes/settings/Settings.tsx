import { Container } from '@chakra-ui/react';
import React from 'react';

import { SettingsContent } from 'shared/modules/settings/SettingsContent';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

const Settings = React.memo(() => {
  return (
    <Layout header={<LayoutHeader showBackButton title="Settings" />}>
      <Container pt="4" maxW="md">
        <SettingsContent />
      </Container>
    </Layout>
  );
});

export default Settings;