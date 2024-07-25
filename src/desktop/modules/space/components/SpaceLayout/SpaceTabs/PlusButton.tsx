import React from 'react';

import { useBoolean, useColorModeValue } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';

import { openTab } from 'shared/actions/space/openTab';
import { ChakraBox } from 'shared/components/ChakraBox';
import { useAppDispatch } from 'shared/store/hooks';

export const PlusButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const hoverBg = useColorModeValue('gray.200', 'brand.400');
  const [layoutAnimation, setFlag] = useBoolean();
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ makeActive: true }));
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
    <ChakraBox
      layout
      w="30px"
      h="30px"
      display="flex"
      variants={container}
      initial="hidden"
      animate={layoutAnimation ? 'hidden' : 'show'}
      alignItems="center"
      justifyContent="center"
      // @ts-ignore
      // transition={{
      //   type: 'spring', // Тип анимации
      //   ease: 'linear',
      //   bounce: 0,
      //   duration: 0.2,
      // }}
      onLayoutAnimationStart={setFlag.on}
      onLayoutAnimationComplete={setFlag.off}
      whileTap={{ 
        scale: 0.9,
      }}
      borderRadius="full"
      cursor="pointer"
      sx={{
        transition: 'background-color 0.3s',
      }}
      _hover={{
        backgroundColor: hoverBg,
      }}
      onClick={handlePlusClick}
    >
      <BsPlus size="22px" />
    </ChakraBox>
  );
});
