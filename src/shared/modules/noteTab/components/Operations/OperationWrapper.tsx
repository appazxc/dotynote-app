import { Box, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { MdClose } from 'react-icons/md';

import { useColorModeValue } from 'shared/components/ui/color-mode';

type Props = React.PropsWithChildren<{
  onClose: () => void,
}>;

export const OperationWrapper = React.memo(({ children, onClose }: Props) => {
  const borderColor = useColorModeValue('gray.700', 'white');

  return (
    <Box
      asChild
      p="2"
      borderRadius="md"
      border="2px solid"
      borderColor={borderColor}
      alignItems="stretch"
      flexDirection="column"
      display="flex"
      my="2"
      position="relative"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
        <IconButton
          aria-label=""
          size="xs"
          colorScheme="brand"
          position="absolute"
          right="0"
          top="0"
          borderRadius="full"
          transform="translate(50%, -50%)"
          onClick={onClose}
        >
          <MdClose />
        </IconButton>
      </motion.div>
    </Box>
  );
});
