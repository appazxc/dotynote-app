import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

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
        as={motion.div}
        layout="position"
        {...props}
      >
        {title}
      </Box>
    </Box>
  );
});
