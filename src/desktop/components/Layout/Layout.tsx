import { Box } from '@chakra-ui/react';
import * as React from 'react';

import { BrowserProviders } from 'shared/components/BrowserProviders';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

const Layout = ({ children, header, footer }: Props) => {
  return (
    <BrowserProviders>
      <Box h="full" w="full">
        {header && header}
        {children}
        {footer}
      </Box>
    </BrowserProviders>
  );
};

export { Layout };
