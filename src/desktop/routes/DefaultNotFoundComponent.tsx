import React from 'react';

import { Center, Text, Link, Stack } from '@chakra-ui/react';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function DefaultNotFoundComponent() {
  return (
    <Layout header={<LayoutHeader position="absolute" />}>
      <Center
        w="full"
        h="full"
        bg="slate.1"
      >
        <Stack textAlign="center">

          <Text fontSize="6xl">404</Text>
          <Text fontSize="2xl">Not Found</Text>

          <Link
            as={DesktopLink}
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

export { DefaultNotFoundComponent };
