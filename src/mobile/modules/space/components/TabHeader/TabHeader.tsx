import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  left?: React.ReactNode;
  children?: React.ReactNode;
  right?: React.ReactNode;
} & Omit<BoxProps, 'children' | 'left' | 'right'>;

export const TabHeader = ({ children, left, right, ...restProps }: Props) => {
  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
      h="10"
      px="2"
      gap="2"
      {...restProps}
    >
      {left && (
        <Box
          flexShrink="0"
          alignItems="center"
          display="flex"
        >
          {left}
        </Box>
      )}
      {children && <Box flexGrow="1" overflow="hidden">{children}</Box>}
      {right && <Box flexShrink="0">{right}</Box>}
    </Box>
  );
};
