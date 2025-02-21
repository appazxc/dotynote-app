import { Box, BoxProps } from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
} & BoxProps;

export const DotsWrapper = React.memo(({ children, ...boxProps }: Props) => {
  return (
    <LayoutGroup>
      <AnimatePresence>
        <Box
          flexDirection="row"
          gap="2"
          display="flex"
          flexWrap="wrap"
          onContextMenu={(e) => {
            e.stopPropagation();
          }}
          {...boxProps}
        >
          {children}
        </Box>
      </AnimatePresence>
    </LayoutGroup>
  );
});
