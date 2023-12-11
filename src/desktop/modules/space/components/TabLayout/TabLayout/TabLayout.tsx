import React from 'react';

import { Box } from '@chakra-ui/react';

import { ScrollProvider } from 'shared/components/ScrollProvider';

type Props = {
  children: React.ReactNode,
  leftSide?: React.ReactNode,
}

export const TabLayout = ({ children, leftSide }: Props) => {
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
      <ScrollProvider>
        {(ref) => (
          <Box
            ref={ref}
            bg="red.100"
            flexGrow="1"
            h="full"
            overflowX="hidden"
            overflowY="scroll"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {children}
          </Box>
        )}
      </ScrollProvider>
    </Box>
  );
};
