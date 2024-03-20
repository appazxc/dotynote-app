import React from 'react';

import { Box } from '@chakra-ui/react';

import { ScrollProvider } from 'shared/components/ScrollProvider';

type Props = {
  children: React.ReactNode,
  leftSide?: React.ReactNode,
  footer?: React.ReactNode,
}

export const TabLayout = ({ children, leftSide, footer }: Props) => {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
    >
      {leftSide && (
        <Box h="full" flexShrink="0">
          {leftSide}
        </Box>
      )}
      <Box
        flexGrow="1"
        h="full"
        display="flex"
        flexDirection="column"
      >
        <Box flexGrow="1" position="relative">
          <Box
            w="full"
            h="full"
            position="absolute"
          >
            <ScrollProvider>
              {(ref) => (
                <>
                  <Box
                    ref={ref}
                    // bg="red.100"
                    w="full"
                    h="full"
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
                </>
              )}
            </ScrollProvider>
          </Box>
        </Box>
        <Box flexShrink="0" w="full">
          {footer}
        </Box>
      </Box>
    </Box>
  );
};
