import { Center, Group } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

function DefaultErrorComponent({ reset, error }) {
  const router = useRouter();

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
        description="Try to reload this tab"
      >
        <Group>
          <Button
            onClick={() => {
              reset();
              router.invalidate();
            }}
          >
            Reload
          </Button>
          <Button asChild variant="outline">
            <DesktopTabLink to="/">Return to home</DesktopTabLink>
          </Button>
        </Group>
      </EmptyState>
    </Center>
  );
}

export { DefaultErrorComponent };
