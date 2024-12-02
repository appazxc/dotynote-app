import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';

type Props = {
  title: string,
} & BoxProps

export const SpaceTabTitle = React.memo(({ title, ...props }: Props) => {
  return (
    <Box
      fontSize="sm"
      whiteSpace="nowrap"
    >
      <Box
        asChild
        {...props}
      >
        <motion.div layout="position">
          {title}
        </motion.div>
      </Box>
    </Box>
  );
});
