import { Center, Group } from '@chakra-ui/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

type Props = {
  Layout: React.ComponentType<{ children: React.ReactNode }>,
  Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
}

function DefaultErrorComponent({ Layout, Link }: Props) {
  return (
    <Layout>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          icon={<TbFaceIdError />}
          title="Error"
          description="Try to reload the page"
        >
          <Group>
            <Button onClick={() => window.location.reload()}>Reload</Button>
            <Button asChild variant="outline">
              <Link to="/">Return to home</Link>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>
  );
}

export { DefaultErrorComponent };
