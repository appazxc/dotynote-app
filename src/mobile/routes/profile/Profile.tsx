import React from 'react';

import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { ProfileContent } from 'shared/modules/profile/ProfileContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const Profile = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Layout
      header={(
        <LayoutHeader
          showBackButton
          onBackButtonClick={() => {
            navigate({ to: '/app/menu' });
          }}
          title="Profile"
        />
      )}
    >
      <Container pt="10" maxW="md">
        <ProfileContent />
      </Container>
    </Layout>
  );
});
