import React from 'react';

import { Center } from '@chakra-ui/react';

import { ContentLoader } from 'shared/components/ContentLoader';

export const Loading = () => {
  return (
    <Center w="full" h="full">
      <ContentLoader />
    </Center>
  );
};
