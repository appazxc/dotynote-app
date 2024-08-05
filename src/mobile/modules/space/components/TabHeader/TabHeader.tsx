import React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
}

export const TabHeader = ({ children, left, right }: Props) => {
  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
      h="10"
      px="2"
      gap="2"
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
      {children && <Box flexGrow="1">{children}</Box>}
      {right && <Box flexShrink="0">{right}</Box>}
    </Box>
  );
};
