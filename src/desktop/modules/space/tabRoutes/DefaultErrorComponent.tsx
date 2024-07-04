import React from 'react';

import { Center, Text, Link, Stack } from '@chakra-ui/react';

import { Layout, LayoutHeader } from 'desktop/components/Layout';
import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

function DefaultErrorComponent({ error }) {
  console.log('error', error);

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
            as={DesktopTabLink}
            to="/"
            color="teal.500"
            mt="10"
          >
            Go to home page
          </Link>
        </Stack>
      </Center>
    </Layout>

  );
}

export { DefaultErrorComponent };
