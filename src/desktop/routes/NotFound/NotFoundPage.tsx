import { Center, Text, Link, Stack } from '@chakra-ui/react';
import { Layout, LayoutHeader } from 'desktop/components/Layout';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function NotFoundPage() {
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

export { NotFoundPage };
