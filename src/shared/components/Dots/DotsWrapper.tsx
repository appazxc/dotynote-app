import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & BoxProps;

export const DotsWrapper = React.memo(({ children, ...boxProps }: Props) => {
  return (
    <Box
      flexDirection="row"
      gap="2"
      display="flex"
      flexWrap="wrap"
      onContextMenu={(e) => {
        e.stopPropagation();
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
});
