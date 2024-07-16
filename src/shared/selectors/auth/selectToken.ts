import { AppState } from 'shared/types/store';

export const selectToken = (state: AppState) => {
  return state.auth.token;
};
