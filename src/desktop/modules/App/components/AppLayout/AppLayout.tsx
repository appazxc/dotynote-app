import { Box } from '@chakra-ui/react';
import React from 'react';

import { AppLayoutHeader } from '../AppLayoutHeader';

export const AppLayout = ({ isLoading, spaceId }) => {
  return (
    <Box w="full" h="full">
      <AppLayoutHeader isLoading={isLoading} />
    </Box>
  );
};
