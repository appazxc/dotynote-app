import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId, selectSortedSpaceTabEntities, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { ThunkAction } from 'shared/types/store';

export const closeRightTabs =
  (tabId: IdentityType): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      
      if (!spaceTab) {
        return;
      }

      const tabIds = queryClient.getQueryData(options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey);
      const sortedTabs = selectSortedSpaceTabEntities(getState(), { ids: tabIds }).map(({ id }) => id);

      const targetTabIndex = sortedTabs.indexOf(tabId);
      const closingTabIds = sortedTabs.slice(targetTabIndex + 1);

      if (activeTabId && closingTabIds.includes(activeTabId)) {
        dispatch(updateActiveTabId(tabId));
      }
      
      queryClient.setQueryData(
        options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey, 
        (oldTabs = []) => oldTabs.filter((id) => !closingTabIds.includes(id))
      );

      closingTabIds.forEach((closingTabId) => {
        entityApi.spaceTab.delete(closingTabId);
      });
    };
