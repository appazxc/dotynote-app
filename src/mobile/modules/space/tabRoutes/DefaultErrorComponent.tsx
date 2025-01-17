import { Center, Link, Stack, Text } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import React from 'react';

import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

function DefaultErrorComponent({ error }) {
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
      <Stack textAlign="center">
        <Text fontSize="6xl">Error</Text>
        <Text fontSize="2xl">Try to reload the page</Text>
        <Link
          asChild
          color="teal.500"
          mt="10"
          justifyContent="center"
        >
          <MobileTabLink to="/">Go to home page</MobileTabLink>
        </Link>
      </Stack>
    </Center>

  );
}

export { DefaultErrorComponent };
