import findIndex from 'lodash/findIndex';

import { updateActiveTabId } from 'shared/actions/space/updateActiveTabId';
import { trackEvent } from 'shared/analytics/posthog';
import { entityApi } from 'shared/api/entityApi';
import { getRoutesMap } from 'shared/modules/space/helpers/routesMap';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';

const getNextActiveTab = (tabs: SpaceTabEntity[], closedTab: SpaceTabEntity): SpaceTabEntity | null => {
  const index = findIndex(tabs, (tab) => tab.id === closedTab.id);

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
  
  const index = findIndex(tabs, (tab) => tab.id === closedTab.id);
  
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

export const closeTab = (tabId: string): ThunkAction => async (dispatch, getState) => {
  const spaceTab = spaceTabSelector.getEntityById(getState(), tabId);
  const activeTabId = selectActiveTabId(getState());
  const activeSpace = selectActiveSpace(getState());
      
  if (!spaceTab || !activeSpace) {
    return;
  }

  const tabs = selectSortedTabs(getState());

  if (activeTabId && activeTabId === tabId && tabs.length) {
    const nextTab = getNextActiveTabByType(tabs, spaceTab);
    dispatch(updateActiveTabId(nextTab?.id || null));
  }

  entityApi.space.updateEntity(activeSpace.id, {
    tabs: tabs.filter(({ id }) => id !== tabId).map(({ id }) => id),
  });

  const routesMap = getRoutesMap();
  routesMap.delete(tabId);

  await entityApi.spaceTab.delete(tabId);

  // Track tab closed
  trackEvent('tab_closed', {
    tab_id: tabId,
    space_id: activeSpace.id,
    was_active: activeTabId === tabId,
    remaining_tabs_count: tabs.length - 1,
  });
};
