import { Button, Center, Group } from '@chakra-ui/react';

import { EmptyState } from 'shared/components/ui/empty-state';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

function DefaultNotFoundComponent() {
  return (
    <Layout header={<LayoutHeader showBackButton />}>
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
              <MobileLink to="/">Return to home</MobileLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>
  );
}

export { DefaultNotFoundComponent };
