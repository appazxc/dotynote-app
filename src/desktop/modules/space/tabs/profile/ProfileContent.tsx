import {
  Container,
  Heading,
} from '@chakra-ui/react';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const ProfileContent = () => {
  return (
    <TabLayout defaultSidebar>
      <Container py="10">
        <Heading size="md">Profile</Heading>
      </Container>
    </TabLayout>
  );
};