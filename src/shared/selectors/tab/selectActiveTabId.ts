import { spaceSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { AppState } from 'shared/types/store';

export const selectActiveTabId = (state: AppState) => {
  const activeSpaceId = selectActiveSpaceId(state);

  if (!activeSpaceId) {
    return null;
  }
  
  const space = spaceSelector.getById(state, activeSpaceId);

  return space?.activeTabId || null;
};