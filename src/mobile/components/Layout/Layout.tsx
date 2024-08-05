import React from 'react';

import { Box, useTheme } from '@chakra-ui/react';

import { ScrollProvider } from 'shared/components/ScrollProvider';

type Props = {
  children: React.ReactNode,
  header?: React.ReactNode,
  footer?: React.ReactNode,
}

export const Layout = ({ children, header, footer }: Props) => {
  const theme = useTheme();

  return (
    <Box
      w="full"
      h="full"
      maxW={theme.breakpoints.sm}
      minW="80"
      mx="auto"
    >
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
    </Box>

  );
};
