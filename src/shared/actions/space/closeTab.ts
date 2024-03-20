import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { getRoutesMap } from 'shared/modules/space/helpers/getRoutesMap';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { ThunkAction } from 'shared/types/store';

const getNextActiveTabId = (tabIds: IdentityType[], closedTabId: IdentityType): IdentityType | null => {
  const index = tabIds.indexOf(closedTabId);

  if (index === -1) {
    // log error
    return null;
  }

  if (tabIds.length <= 1) {
    return null;
  }

  if (index === tabIds.length - 1) {
    return tabIds[index - 1];
  }

  return tabIds[index + 1];
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

      if (activeTabId && activeTabId === tabId && tabIds) {
        const nextTabId = getNextActiveTabId(tabIds, tabId);
        dispatch(updateActiveTabId(nextTabId));
      }
      
      queryClient.setQueryData(
        options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey, 
        (oldTabs = []) => oldTabs.filter(spaceTabId => spaceTabId !== tabId)
      );

      const routesMap = getRoutesMap();
      routesMap.delete(tabId);
      
      await entityApi.spaceTab.delete(tabId);

    };
