import React from 'react';

import { Center, Text, Link, Stack } from '@chakra-ui/react';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

function DefaultNotFoundComponent() {
  return (
    <Center
      w="full"
      h="full"
    >
      <Stack textAlign="center">

        <Text fontSize="6xl">404</Text>
        <Text fontSize="2xl">Not Found</Text>

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
  );
}

export { DefaultNotFoundComponent };
