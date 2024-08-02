import * as React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Layout = ({ children, header, footer }: Props) => {
  return (
    <Box h="full" w="full">
      {header && header}
      {children}
      {footer}
    </Box>
  );
};

export { Layout };
