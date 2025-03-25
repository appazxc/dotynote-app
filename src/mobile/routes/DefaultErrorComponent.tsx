import { Button, Center, Group } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { EmptyState } from 'shared/components/ui/empty-state';

import { Layout } from 'mobile/components/Layout';
import { MobileLink } from 'mobile/components/MobileLink';

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
        bg="slate.1"
      >
        <EmptyState
          icon={<TbFaceIdError />}
          title="Error"
          description="Try to reload the page"
        >
          <Group>
            <Button onClick={() => window.location.reload()}>Reload</Button>
            <Button asChild variant="outline">
              <MobileLink to="/">Return to home</MobileLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>

  );
}

export { DefaultErrorComponent };
