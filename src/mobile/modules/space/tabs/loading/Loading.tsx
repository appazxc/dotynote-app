import React from 'react';

import { Center } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';

export const Loading = () => {
  return (
    <Center w="full" h="full">
      <Loader />
    </Center>
  );
};
