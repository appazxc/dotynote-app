import { Button, Center, Group } from '@chakra-ui/react';

import { EmptyState } from 'shared/components/ui/empty-state';

type Props = {
  Layout: React.ComponentType<{ children: React.ReactNode }>,
  Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
}

function DefaultNotFoundComponent({ Layout, Link }: Props) {
  return (
    <Layout>
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
              <Link to="/">Return to home</Link>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>
  );
}

export { DefaultNotFoundComponent };
