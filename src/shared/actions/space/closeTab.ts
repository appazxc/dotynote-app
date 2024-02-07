import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { getNextActiveTabId } from 'shared/helpers/space/getNextActiveTabId';
import { spaceTabSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/store';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';

export const closeTab =
  (tabId: string): ThunkAction =>
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

      await entityApi.spaceTab.delete(tabId);
    };
