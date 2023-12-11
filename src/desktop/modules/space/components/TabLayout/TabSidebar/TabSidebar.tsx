import React from 'react';

import { Box } from '@chakra-ui/react';

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
