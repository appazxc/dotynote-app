import { Center, Group, Link, Stack, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { TbFaceIdError } from 'react-icons/tb';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

function DefaultErrorComponent({ reset, error }) {
  const router = useRouter();

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
            <DesktopTabLink to="/">Go to home screen</DesktopTabLink>
          </Button>
        </Group>
      </EmptyState>
    </Center>
  );
}

export { DefaultErrorComponent };
