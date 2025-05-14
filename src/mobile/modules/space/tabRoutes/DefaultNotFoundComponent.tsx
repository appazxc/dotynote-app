import { Center } from '@chakra-ui/react';
import { useLocation } from '@tanstack/react-router';

import { EmptyState } from 'shared/components/ui/empty-state';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

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
