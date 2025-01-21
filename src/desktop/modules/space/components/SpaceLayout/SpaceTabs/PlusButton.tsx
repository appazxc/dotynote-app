import { Box } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { useBoolean } from 'usehooks-ts';

import { openTab } from 'shared/actions/space/openTab';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { useAppDispatch } from 'shared/store/hooks';

export const PlusButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const hoverBg = useColorModeValue('gray.200', 'brand.400');

  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ active: true }));
  }, [dispatch]);

  return (
    <Box
      w="30px"
      h="30px"
      display="flex"
      
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
      cursor="pointer"
      css={{
        transition: 'background-color 0.3s',
      }}
      _hover={{
        backgroundColor: hoverBg,
      }}
    >
      <motion.div
        whileTap={{ 
          scale: 0.9,
        }}
        onClick={handlePlusClick}
      >
        <BsPlus size="22px" />
      </motion.div>
    </Box>
  );
});
