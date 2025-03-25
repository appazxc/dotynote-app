import { Center, Group } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';

function DefaultErrorComponent({ error }) {
  React.useEffect(() => {
    Sentry.captureException(error, {
      tags: { module: 'DefaultErrorComponent' },
    });
  }, [error]);

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
              <DesktopLink to="/">Return to home</DesktopLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>

  );
}

export { DefaultErrorComponent };
