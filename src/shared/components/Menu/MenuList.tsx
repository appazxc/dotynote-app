import React from 'react';

import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';

export const MenuList = React.forwardRef<HTMLDivElement, BoxProps>(({ children, ...props }, ref) => {
  const bg = useColorModeValue('white', 'brand.700');
  
  return (
    <Box
      ref={ref}
      boxShadow="md"
      borderRadius="6"
      bg={bg}
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
