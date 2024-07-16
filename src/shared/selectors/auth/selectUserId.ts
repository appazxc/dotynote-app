import { AppState } from 'shared/types/store';

export const selectUserId = (state: AppState) => {
  return state.auth.userId;
};