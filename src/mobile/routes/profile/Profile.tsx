import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { ProfileContent } from 'shared/modules/profile/ProfileContent';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

const Profile = React.memo(() => {
  const navigate = useNavigate();

  return (
    <Layout
      header={(
        <LayoutHeader
          showBackButton
          title="Profile"
          onBackButtonClick={() => {
            navigate({ to: '/app/menu' });
          }}
        />
      )}
    >
      <Container pt="10" maxW="md">
        <ProfileContent />
      </Container>
    </Layout>
  );
});

export default Profile;