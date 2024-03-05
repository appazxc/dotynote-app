import React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

export const TabSidebar = ({ children, header, footer }: Props) => {
  return (
    <Box
      h="full"
      display="flex"
      flexDirection="column"
    >
      <Box flexShrink="0">
        {header}
      </Box>
      <Box flexGrow="1">
        {children}
      </Box>
      <Box flexShrink="0">
        {footer}
      </Box>
    </Box>
  );
};
