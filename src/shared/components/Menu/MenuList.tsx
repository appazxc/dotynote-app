import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export const MenuList = React.forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      boxShadow="md"
      bgColor="white"
      borderRadius="6"
      display="flex"
      flexDirection="column"
      p="1"
      {...props}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </Box>
  );
});
