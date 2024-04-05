import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { getRoutesMap } from 'shared/modules/space/helpers/getRoutesMap';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId, selectSortedSpaceTabEntities, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';

const getNextActiveTab = (tabs: SpaceTabEntity[], closedTab: SpaceTabEntity): SpaceTabEntity | null => {
  const index = tabs.indexOf(closedTab);

  if (index === -1) {
    // log error
    return null;
  }

  if (tabs.length <= 1) {
    return null;
  }

  if (index === tabs.length - 1) {
    return tabs[index - 1];
  }

  return tabs[index + 1];
};

const getNextActiveTabByType = (tabs: SpaceTabEntity[], closedTab: SpaceTabEntity): SpaceTabEntity | null => {
  const tabIsPinned = closedTab.isPinned;
  const pinned = tabs.filter(({ isPinned }) => isPinned);
  const unpinned = tabs.filter(({ isPinned }) => !isPinned);
  
  const index = tabs.indexOf(closedTab);
  
  if (index === -1) {
    // log error
    return null;
  }
  
  if (tabs.length <= 1) {
    return null;
  }

  const isLastPinnedTab = pinned[pinned.length - 1] === closedTab;

  if (tabIsPinned && isLastPinnedTab && !!unpinned.length) {
    return unpinned[0];
  }

  const tab = getNextActiveTab(tabIsPinned ? pinned : unpinned, closedTab);

  if (tab) {
    return tab;
  }

  const otherTabs = tabIsPinned ? unpinned : pinned;
  const checkIndex = tabIsPinned ? 0 : unpinned.length - 1;

  return otherTabs[checkIndex];
};

export const closeTab =
  (tabId: IdentityType): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      
      if (!spaceTab) {
        return;
      }

      const tabIds = queryClient.getQueryData(options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey);

      const sortedTabs = selectSortedSpaceTabEntities(getState(), { ids: tabIds });

      if (activeTabId && activeTabId === tabId && tabIds) {
        const nextTab = getNextActiveTabByType(sortedTabs, spaceTab);
        dispatch(updateActiveTabId(nextTab?.id || null));
      }
      
      queryClient.setQueryData(
        options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey, 
        (oldTabs = []) => oldTabs.filter(spaceTabId => spaceTabId !== tabId)
      );

      const routesMap = getRoutesMap();
      routesMap.delete(tabId);
      
      await entityApi.spaceTab.delete(tabId);

    };
