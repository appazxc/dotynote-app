import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { AnimatePresence, Reorder } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';

import { openTab } from 'shared/actions/space/openTab';
import { reorderTabs } from 'shared/actions/space/reorderTabs';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { useAppDispatch } from 'shared/store/hooks';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const { tabs } = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
 
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ makeActive: true }));
  }, [dispatch]);
  
  const handleReorderTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data));
  }, [dispatch]);
  
  return (
    <Box
      as={Reorder.Group}
      display="flex"
      layout
      flexDirection="row"
      gap="1"
      flexGrow="1"
      axis="x"
      values={tabs}
      onReorder={handleReorderTabs}
    >
      <AnimatePresence initial={false}>
        {tabs?.map((tab, index) => (
          <SpaceTab
            key={tab.id}
            id={tab.id}
            isLast={tabs.length === index + 1}
          />
        ))}
      </AnimatePresence>

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
