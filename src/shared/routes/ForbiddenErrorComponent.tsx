import { Center, Group } from '@chakra-ui/react';
import { Navigate, useRouter } from '@tanstack/react-router';
import React from 'react';
import { SiFusionauth } from 'react-icons/si';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

function ForbiddenErrorComponent({ reset, Layout, reason = 'Unknown' }) {
  const router = useRouter();
  const title = 'Forbidden';

  const description = React.useMemo(() => {
    switch (reason) {
    case 'deleting':
      return 'We are deleting your account. Please wait for the deletion to complete.';
    case 'banned':
      return 'Your account is banned.';
    case 'migratingRegion':
      return 'We are migrating your data to a new region. Please wait for the migration to complete.';
    default:
      return 'You are not authorized to access this page.';
    }
  }, [reason]);

  if (reason) {
    return <Navigate to="/app/forbidden-user-status" />;
  }

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

export { ForbiddenErrorComponent };
