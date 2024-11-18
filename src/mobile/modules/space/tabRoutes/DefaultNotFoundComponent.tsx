import { Center, Link, Stack, Text } from '@chakra-ui/react';
import { useLocation } from '@tanstack/react-router';

import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

function DefaultNotFoundComponent() {
  const location = useLocation();

  console.log('DefaultNotFoundComponent location', location);

  return (
    <Center
      w="full"
      h="full"
    >
      <Stack textAlign="center">

        <Text fontSize="6xl">404</Text>
        <Text fontSize="2xl">Tab content not found</Text>

        <Link
          asChild
          color="teal.500"
          mt="10"
          justifyContent="center"
        >
          <MobileTabLink to="/">Go to home page</MobileTabLink>
        </Link>
      </Stack>

    </Center>
  );
}

export { DefaultNotFoundComponent };
