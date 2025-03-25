import { Center, Group } from '@chakra-ui/react';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';
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
        >
          <Group>
            <Button
              asChild
              variant="subtle"
              size="3xs"
            >
              <DesktopTabLink to="/">Return to home</DesktopTabLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </TabLayout>
  );
}

export { DefaultNotFoundComponent };
