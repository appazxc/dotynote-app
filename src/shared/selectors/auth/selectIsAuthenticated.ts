import { AppState } from 'shared/types/store';

export const selectIsAuthenticated = (state: AppState) => {
  return !!state.auth.userId;
};