import { Button, Center, Group } from '@chakra-ui/react';

import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function DefaultNotFoundComponent() {
  return (
    <Layout header={<LayoutHeader position="absolute" />}>
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
              <DesktopLink to="/">Return to home</DesktopLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>
  );
}

export { DefaultNotFoundComponent };
