import { Center, Link, Stack, Text } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

import { MobileLink } from 'mobile/components/MobileLink';

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
        bg="slate.1"
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
            <MobileLink to="/">Go to home page</MobileLink>
          </Link>
        </Stack>
      </Center>
    </Layout>

  );
}

export { DefaultErrorComponent };
