import { Center, Group } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { SiFusionauth } from 'react-icons/si';

import { Button } from 'shared/components/ui/button';
import { EmptyState } from 'shared/components/ui/empty-state';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function AuthErrorComponent({ reset }) {
  const router = useRouter();

  return (
    <Layout header={<LayoutHeader position="absolute" />}>
      <Center
        w="full"
        h="full"
      >
        <EmptyState
          icon={<SiFusionauth />}
          title="Authorization Error"
          description="There was a problem with your login. Please try to reload the page."
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
            <Button asChild variant="outline">
              <DesktopLink to="/">Go to home</DesktopLink>
            </Button>
          </Group>
        </EmptyState>
      </Center>
    </Layout>

  );
}

export { AuthErrorComponent };
