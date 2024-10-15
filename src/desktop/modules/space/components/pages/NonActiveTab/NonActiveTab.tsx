import React from 'react';

import { Container } from '@chakra-ui/react';

import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';

export const NonActiveTab = () => {
  return (
    <SpaceLayout>
      <Container maxW="container.md" />
    </SpaceLayout>
  );
};
