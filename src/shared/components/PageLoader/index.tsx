import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

export default function PageLoader() {
  return (
    <Center w="full" h="full">
      <Spinner />
    </Center>
  );
}
