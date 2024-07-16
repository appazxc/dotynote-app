import { AppState } from 'shared/types/store';

import { userSelector } from '../entities';

export const selectUser = (state: AppState) => {
  return userSelector.getById(state, state.auth.userId);
};