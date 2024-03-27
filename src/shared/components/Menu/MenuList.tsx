import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';

export const MenuList = React.forwardRef<
  HTMLDivElement,
  BoxProps
>(({ children, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      w="150px"
      h="150px"
      bgColor="green"
      {...props}
    >
      {children}
    </Box>
  );
});
