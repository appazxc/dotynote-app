import { AppState } from 'shared/types/store';

export const selectActiveSpaceId = (state: AppState) => {
  return state.app.activeSpaceId;
};