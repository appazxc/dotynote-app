import { entityApi } from 'shared/api/entityApi';
import { getNextActiveTabId } from 'shared/helpers/space/spaceTabsHelpers';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/store';
import { selectActiveTabId, updateActiveTabId } from 'shared/store/slices/appSlice';

export const closeTab = (tabId: string): ThunkAction => 
  async (dispatch, getState) => {
    const spaceTab = spaceTabSelector.getById(getState(), tabId);
    const space = spaceSelector.getById(getState(), spaceTab?.spaceId);
    const activeTabId = selectActiveTabId(getState());

    if (!space) {
      return;
    }

    if (activeTabId && activeTabId === tabId) {
      dispatch(updateActiveTabId(getNextActiveTabId(space.spaceTabs, tabId)));
    }

    await entityApi.space.update(space.id, {
      spaceTabs: space.spaceTabs.filter(id => id !== tabId),
    });
  };
