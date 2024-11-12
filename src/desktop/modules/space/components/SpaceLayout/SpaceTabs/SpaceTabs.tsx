import { Box } from '@chakra-ui/react';
import { LayoutGroup, Reorder } from 'framer-motion';
import React from 'react';

import { reorderTabs } from 'shared/actions/space/reorderTabs';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { PlusButton } from 'desktop/modules/space/components/SpaceLayout/SpaceTabs/PlusButton';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const tabs = useAppSelector(selectSortedTabs);
  const dispatch = useAppDispatch();
  
  const handleReorderPinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, true));
  }, [dispatch]);

  const handleReorderUnpinnedTabs = React.useCallback((data) => {
    dispatch(reorderTabs(data, false));
  }, [dispatch]);
  
  const pinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => isPinned).map(({ id }) => id), [tabs]);
  const unpinnedTabs = React.useMemo(() => tabs?.filter(({ isPinned }) => !isPinned).map(({ id }) => id), [tabs]);

  return (
    <LayoutGroup>
      <Box 
        display="flex"
        flexDirection="row"
        gap="1"
      >
        <Box
          asChild
          display="flex"
          flexDirection="row"
          flexShrink="0"
          gap="1"
        >
          <Reorder.Group
            layout
            axis="x"
            values={pinnedTabs}
            onReorder={handleReorderPinnedTabs}
          >
            {pinnedTabs?.map((id, index) => (
              <SpaceTab
                key={id}
                id={id}
                isLast={pinnedTabs.length === index + 1 && unpinnedTabs?.length === 0}
              />
            ))}
          </Reorder.Group>
        </Box>
        <Box
          asChild
          display="flex"
          flexDirection="row"
          gap="1"
          flexGrow="1"
        >
          <Reorder.Group
            layout
            axis="x"
            values={unpinnedTabs}
            onReorder={handleReorderUnpinnedTabs}
          >
            {unpinnedTabs?.map((id, index) => (
              <SpaceTab
                key={id}
                id={id}
                isLast={unpinnedTabs.length === index + 1}
              />
            ))}
            <PlusButton />
          </Reorder.Group>
          
        </Box>
      </Box>
    </LayoutGroup>
  );
});
