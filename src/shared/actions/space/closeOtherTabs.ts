import { entityApi } from 'shared/api/entityApi';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace, selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { ThunkAction } from 'shared/types/store';

export const closeOtherTabs =
  (tabId: IdentityType): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());
      const activeSpace = selectActiveSpace(getState());

      if (!spaceTab || !activeSpace) {
        return;
      }

      const tabIds = activeSpace.spaceTabs;

      if (tabId !== activeTabId) {
        dispatch(updateActiveTabId(tabId));
      }
      
      entityApi.space.updateEntity(activeSpace.id, {
        spaceTabs: [tabId],
      });

      tabIds.filter(id => id !== tabId).forEach((closingTabId) => {
        entityApi.spaceTab.delete(closingTabId);
      });
    };
