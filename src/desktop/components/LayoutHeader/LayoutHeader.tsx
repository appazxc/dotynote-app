import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  position?: BoxProps['position'];
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<BoxProps, 'children' | 'left' | 'right'>

export const LayoutHeader = ({ position, left, right, children, ...boxProps }: Props) => {
  const rootProps: BoxProps | undefined = 
    position === 'absolute'
      ? {
        position: 'absolute',
        width: 'full',
        top: '0',
        left: '0',
      }
      : position === 'sticky' 
        ? { position: 'sticky' } : undefined;

  return (
    <Box
      {...rootProps}
      background="body"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...boxProps}
    >
      {left && <Box>{left}</Box>}
      {children && <Box>{children}</Box>}
      {right && <Box>{right}</Box>}
    </Box>
  );
};
