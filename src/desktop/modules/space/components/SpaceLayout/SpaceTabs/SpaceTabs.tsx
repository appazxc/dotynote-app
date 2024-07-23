import React from 'react';

import { Box } from '@chakra-ui/react';
import { LayoutGroup, Reorder } from 'framer-motion';

import { reorderTabs } from 'shared/actions/space/reorderTabs';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { useAppDispatch } from 'shared/store/hooks';

import { PlusButton } from 'desktop/modules/space/components/SpaceLayout/SpaceTabs/PlusButton';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const tabs = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
  
  const handleReorderPinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, true));
  }, [dispatch]);

  const handleReorderUnpinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, false));
  }, [dispatch]);
  
  const pinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => isPinned), [tabs]);
  const unpinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => !isPinned), [tabs]);

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
          <PlusButton />
        </Box>
      </Box>
    </LayoutGroup>
  );
});
