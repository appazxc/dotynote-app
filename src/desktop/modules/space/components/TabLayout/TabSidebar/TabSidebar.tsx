import { Box } from '@chakra-ui/react';
import React from 'react';

export const TabSidebar = ({ children }) => {
  return (
    <Box
      h="full"
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
};
