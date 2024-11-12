import { Center, Link, Stack, Text } from '@chakra-ui/react';

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

export { DefaultNotFoundComponent };
