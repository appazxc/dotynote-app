import React from 'react';

import { Box } from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup, Reorder } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';

import { openTab } from 'shared/actions/space/openTab';
import { reorderTabs } from 'shared/actions/space/reorderTabs';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { ChakraBox } from 'shared/components/ChakraBox';
import { useAppDispatch } from 'shared/store/hooks';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const tabs = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
 
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ makeActive: true }));
  }, [dispatch]);
  
  const handleReorderPinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, true));
  }, [dispatch]);

  const handleReorderUnpinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, false));
  }, [dispatch]);
  
  const pinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => isPinned), [tabs]);
  const unpinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => !isPinned), [tabs]);
  console.log('unpinnedTabs', tabs, unpinnedTabs);
  return (
    <LayoutGroup>
      <Box 
        display="flex"
        flexDirection="row"
        gap="1"
      >
        <Box
          as={Reorder.Group}
          display="flex"
          layout
          flexDirection="row"
          flexShrink="0"
          gap="1"
          axis="x"
          values={pinnedTabs}
          onReorder={handleReorderPinnedTabs}
        >
          {pinnedTabs?.map((tab, index) => (
            <SpaceTab
              key={tab.id}
              id={tab.id}
              isLast={pinnedTabs.length === index + 1 && unpinnedTabs?.length === 0}
            />
          ))}
        </Box>
        <Box
          as={Reorder.Group}
          display="flex"
          layout
          flexDirection="row"
          gap="1"
          flexGrow="1"
          axis="x"
          values={unpinnedTabs}
          onReorder={handleReorderUnpinnedTabs}
        >
          {unpinnedTabs?.map((tab, index) => (
            <SpaceTab
              key={tab.id}
              id={tab.id}
              isLast={unpinnedTabs.length === index + 1}
            />
          ))}
          <ChakraBox
            layout
            w="30px"
            h="30px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            // @ts-ignore
            transition={{
              type: 'spring', // Тип анимации
              ease: 'linear',
              bounce: 0,
              duration: 0.71,
            }}
            whileTap={{ 
              scale: 0.9,
            }}
            borderRadius="full"
            cursor="pointer"
            onClick={handlePlusClick}
            sx={{
              transition: 'background-color 0.3s',
            }}
            backgroundColor="gray.100"
            _hover={{
              backgroundColor: 'gray.200',
            }}
          >
            <BsPlus size="22px" />
          </ChakraBox>
        </Box>
      </Box>
    </LayoutGroup>
  );
});
