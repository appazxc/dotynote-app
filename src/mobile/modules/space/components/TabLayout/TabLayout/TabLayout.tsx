import React from 'react';

import { Box } from '@chakra-ui/react';

import { ScrollProvider } from 'shared/components/ScrollProvider';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

export const TabLayout = ({ children, header, footer }: Props) => {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      flexDirection="column"
    >
      {header && (
        <Box w="full" flexShrink="0">
          {header}
        </Box>
      )}
      <ScrollProvider>
        {(ref) => (
          <Box
            ref={ref}
            bg="red.100"
            flexGrow="1"
            w="full"
            overflowX="hidden"
            overflowY="scroll"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {children}
          </Box>
        )}
      </ScrollProvider>
      {footer && (
        <Box w="full" flexShrink="0">
          {footer}
        </Box>
      )}
    </Box>
  );
};
