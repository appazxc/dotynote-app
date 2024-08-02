import React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

export const Layout = ({ children, header, footer }: Props) => {
  return (
    <Box w="full" h="full">
      {header && header}
      {children}
      {footer}
    </Box>
  );
};
