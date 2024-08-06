import React from 'react';

import { Box, BoxProps, LightMode } from '@chakra-ui/react';

export const MenuList = React.forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  return (
    <LightMode>
      <Box
        ref={ref}
        boxShadow="md"
        borderRadius="md"
        bg="white"
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
    </LightMode>
  );
});
