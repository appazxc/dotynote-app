import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { ThunkAction } from 'shared/types/store';

export const closeOtherTabs =
  (tabId: IdentityType): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      
      if (!spaceTab) {
        return;
      }

      const tabIds = queryClient.getQueryData(options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey);

      if (!tabIds) {
        return;
      }

      if (tabId !== activeTabId) {
        dispatch(updateActiveTabId(tabId));
      }
      
      queryClient.setQueryData(
        options.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey, 
        () => [tabId]
      );

      tabIds.filter(id => id !== tabId).forEach((closingTabId) => {
        entityApi.spaceTab.delete(closingTabId);
      });
    };
