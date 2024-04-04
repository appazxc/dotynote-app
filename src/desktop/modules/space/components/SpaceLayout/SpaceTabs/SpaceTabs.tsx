import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { motion, LayoutGroup } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';

import { openTab } from 'shared/actions/space/openTab';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { ChakraBox } from 'shared/components/ChakraBox';
import { useAppDispatch } from 'shared/store/hooks';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const { tabs } = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
  console.log('data', tabs);
 
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ makeActive: true }));
  }, [dispatch]);
  
  return (
    <Box
      as={motion.div}
      display="flex"
      layout
      flexDirection="row"
      gap="1"
      flexGrow="1"
      pr="40px"
    >
      {tabs?.map(({ id }, index) => (
        <SpaceTab
          key={id}
          id={id}
          isLast={tabs.length === index + 1}
        />
      ))}
      <IconButton
        size="sm"
        aria-label="Add"
        icon={<BsPlus size="22px" />}
        borderRadius="full"
        variant="ghost"
        onClick={handlePlusClick}
      />
    </Box>
  );
});
