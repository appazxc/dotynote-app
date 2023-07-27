import { Box } from '@chakra-ui/react';
import React from 'react';

export const AppLayoutHeader = ({ isLoading }) => {
  return (
    <Box
      w="full"
      px="4"
      py="4"
    >
      Header { isLoading ? 'loading...' : ''}
    </Box>
  );
};
