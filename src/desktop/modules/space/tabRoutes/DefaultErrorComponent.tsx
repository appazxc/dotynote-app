import { Center, Link, Stack, Text } from '@chakra-ui/react';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';

function DefaultErrorComponent({ error }) {
  return (
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
        >
          <DesktopTabLink to="/">Go to home page</DesktopTabLink>
        </Link>
      </Stack>
    </Center>

  );
}

export { DefaultErrorComponent };
