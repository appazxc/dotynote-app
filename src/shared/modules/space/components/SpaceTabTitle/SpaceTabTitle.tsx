import React from 'react';

import { Box } from '@chakra-ui/react';
// import { motion } from 'framer-motion';

type Props = {
  title: string,
}

export const SpaceTabTitle = React.memo(({ title }: Props) => {
  return (
    <Box
      fontSize="sm"
      whiteSpace="nowrap"
    >
      <Box
        // as={motion.div}
        // layout="position"
      >
        {title}
      </Box>
    </Box>
  );
});
