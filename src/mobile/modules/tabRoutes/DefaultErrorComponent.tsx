import React from 'react';

import { Center, Text, Link, Stack } from '@chakra-ui/react';

import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

function DefaultErrorComponent({ error }) {
  return (
    <Center
      w="full"
      h="full"
    >
      <Stack textAlign="center">
        <Text fontSize="6xl">Error</Text>
        <Text fontSize="2xl">Try to reload the page</Text>
        <Link
          as={MobileTabLink}
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

export { DefaultErrorComponent };
