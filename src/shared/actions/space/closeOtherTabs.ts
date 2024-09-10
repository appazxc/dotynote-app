import { entityApi } from 'shared/api/entityApi';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/types/store';

export const closeOtherTabs =
  (tabId: string): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      const activeSpace = selectActiveSpace(getState());

      if (!spaceTab || !activeSpace) {
        return;
      }

      const tabs = activeSpace.tabs;

      if (tabId !== activeTabId) {
        dispatch(updateActiveTabId(tabId));
      }
      
      entityApi.space.updateEntity(activeSpace.id, {
        tabs: [tabId],
      });

      tabs.filter(({ id }) => id !== tabId).forEach(({ id }) => {
        entityApi.spaceTab.delete(id);
      });
    };
