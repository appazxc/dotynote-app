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
  const { value, setTrue, setFalse } = useBoolean();
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ active: true }));
  }, [dispatch]);

  const container = {
    hidden: { 
      opacity: 0, 
      transition: {
        duration: 0,
      }, 
    },
    show: {
      opacity: 1,
    },
  };
  
  return (
    <Box
      w="30px"
      h="30px"
      display="flex"
      
      alignItems="center"
      justifyContent="center"
      // @ts-ignore
      // transition={{
      //   type: 'spring', // Тип анимации
      //   ease: 'linear',
      //   bounce: 0,
      //   duration: 0.2,
      // }}
      
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
        layout
        variants={container}
        initial="hidden"
        animate={value ? 'hidden' : 'show'}
        whileTap={{ 
          scale: 0.9,
        }}
        onClick={handlePlusClick}
        onLayoutAnimationStart={setTrue}
        onLayoutAnimationComplete={setFalse}
      >
        <BsPlus size="22px" />
      </motion.div>
    </Box>
  );
});
