import { Center, Group } from '@chakra-ui/react';
import { useLocation } from '@tanstack/react-router';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

function DefaultNotFoundComponent() {
  const location = useLocation();

  console.log('DefaultNotFoundComponent location', location);

  return (
    <Layout header={<LayoutHeader showBackButton />}>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          title="404"
          description="Not found"
        />
      </Center>
    </Layout>
  );
}

export { DefaultNotFoundComponent };
