import { entityApi } from 'shared/api/entityApi';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/types/store';

export const closeRightTabs =
  (tabId: string): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      const activeSpace = selectActiveSpace(getState());

      if (!spaceTab || !activeSpace) {
        return;
      }

      const tabIds = activeSpace.tabs;
      const sortedTabs = selectSortedTabs(getState(), { ids: tabIds }).map(({ id }) => id);

      const targetTabIndex = sortedTabs.indexOf(tabId);
      const closingTabIds = sortedTabs.slice(targetTabIndex + 1);

      if (activeTabId && closingTabIds.includes(activeTabId)) {
        dispatch(updateActiveTabId(tabId));
      }
      
      entityApi.space.updateEntity(activeSpace.id, {
        tabs: tabIds.filter((id) => !closingTabIds.includes(id)),
      });

      closingTabIds.forEach((closingTabId) => {
        entityApi.spaceTab.delete(closingTabId);
      });
    };
