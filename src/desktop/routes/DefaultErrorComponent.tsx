import { Center, Link, Stack, Text } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function DefaultErrorComponent({ error }) {
  React.useEffect(() => {
    Sentry.captureException(error, {
      tags: { module: 'DefaultErrorComponent' },
    });
  }, [error]);

  return (
    <Layout header={<LayoutHeader position="absolute" />}>
      <Center
        w="full"
        h="full"
      >
        <Stack textAlign="center">

          <Text fontSize="6xl">Error</Text>
          <Text fontSize="2xl">Try to reload the page</Text>

          <Link
            asChild
            color="teal.500"
            mt="10"
            justifyContent="center"
          >
            <DesktopLink to="/">Go to home page</DesktopLink>
          </Link>
        </Stack>
      </Center>
    </Layout>

  );
}

export { DefaultErrorComponent };
