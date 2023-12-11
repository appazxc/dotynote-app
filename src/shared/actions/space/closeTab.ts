import { entityApi } from 'shared/api/entityApi';
import { getNextActiveTabId } from 'shared/helpers/space/spaceTabsHelpers';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/store';

export const closeTab = (tabId: string): ThunkAction => 
  async (dispatch, getState) => {
    const spaceTab = spaceTabSelector.getById(getState(), tabId);
    const space = spaceSelector.getById(getState(), spaceTab?.spaceId);

    if (!space || !spaceTab) {
      return;
    }

    await entityApi.space.update(space.id, {
      spaceTabs: space.spaceTabs.filter(id => id !== tabId),
      ...space.activeTabId === tabId ? { activeTabId: getNextActiveTabId(space.spaceTabs, tabId) } : null,
    });
  };
