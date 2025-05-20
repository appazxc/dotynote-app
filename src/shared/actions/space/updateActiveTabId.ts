import { entityApi } from 'shared/api/entityApi';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { ThunkAction } from 'shared/types/store';

export const updateActiveTabId = (tabId: string | null, sync = true): ThunkAction => async (_, getState) => {
  const space = selectActiveSpace(getState());

  if (!space || (tabId && !space.tabs.find(({ id }) => id === tabId))) {
    return;
  }

  if (tabId === space.activeTabId) {
    return;
  }

  await entityApi.space.update(space.id, {
    activeTabId: tabId,
  }, sync);
};
