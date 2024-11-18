import { Center, Link, Stack, Text } from '@chakra-ui/react';

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
          asChild
          color="teal.500"
          mt="10"
        >
          <MobileTabLink to="/">Go to home page</MobileTabLink>
        </Link>
      </Stack>
    </Center>

  );
}

export { DefaultErrorComponent };
