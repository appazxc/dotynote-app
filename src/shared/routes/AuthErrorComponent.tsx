import { Center, Group } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { SiFusionauth } from 'react-icons/si';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';
import { UnauthorizedError } from 'shared/util/errors';

function AuthErrorComponent({ reset, error, Layout }) {
  const router = useRouter();
  const isAuthError = error instanceof UnauthorizedError;
  const title = isAuthError ? 'Authorization Error' : 'Loading Error';
  const description = isAuthError 
    ? 'There was a problem with your login. Please try to reload the page.' 
    : 'There was a problem with loading the page. Please try to reload.';

  return (
    <Layout>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          icon={<SiFusionauth />}
          title={title}
          description={description}
        >
          <Group>
            <Button
              onClick={() => {
                reset();
                router.invalidate();
              }}
            >
              Reload page
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>

  );
}

export { AuthErrorComponent };
