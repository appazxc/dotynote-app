import { Center } from '@chakra-ui/react';

import { EmptyState } from 'shared/components/ui/empty-state';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

function DefaultNotFoundComponent() {
  return (
    <TabLayout defaultSidebar>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          title="404"
          description="Not found"
        />
      </Center>
    </TabLayout>
  );
}

export { DefaultNotFoundComponent };
