import { AppState } from 'shared/types/store';

import { spaceSelector } from '../entities';

export const selectActiveSpace = (state: AppState) => {
  return spaceSelector.getById(state, state.app.activeSpaceId);
};