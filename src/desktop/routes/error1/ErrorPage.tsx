import { Center, Text, Link, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

function ErrorPage() {
  const error = useRouteError();
  console.log('errorr', error);

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
            as={RouterLink}
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

export { ErrorPage };
