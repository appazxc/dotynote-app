import { Button, Center, Group } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { EmptyState } from 'shared/components/ui/empty-state';

import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

function DefaultTabError({ error }) {
  React.useEffect(() => {
    Sentry.captureException(error, {
      tags: { module: 'DefaultErrorComponent' },
    });
  }, [error]);

  return (
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
            <MobileTabLink to="/">Return to home</MobileTabLink>
          </Button>
        </Group>
      </EmptyState>
    </Center>

  );
}

export { DefaultTabError };
