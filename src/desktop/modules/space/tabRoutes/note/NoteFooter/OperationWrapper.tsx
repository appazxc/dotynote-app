import React from 'react';

import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type Props = React.PropsWithChildren<{}>;

export const OperationWrapper = React.memo(({ children }: Props) => {
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      bg="red"
      alignItems="center"
      display="flex"
      my="2"
    >
      {children}
    </Box>
  );
});
