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
            asChild
            color="teal.500"
            mt="10"
            justifyContent="center"
          >
            <DesktopLink to="/">
              Go to home page
            </DesktopLink> 
          </Link>
        </Stack>
      </Center>
    </Layout>
  );
}

export { DefaultNotFoundComponent };
