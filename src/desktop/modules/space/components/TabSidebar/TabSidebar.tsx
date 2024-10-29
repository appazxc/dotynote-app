import React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children?: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
  inline?: boolean,
}

export const TabSidebar = React.memo(({ children, header, footer, inline }: Props) => {
  return (
    <Box
      h={inline ? undefined : 'full'}
      w={inline ? 'full' : undefined}
      display="flex"
      flexDirection={inline ? 'row' : 'column'}
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
});
