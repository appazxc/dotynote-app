import { AppState } from 'shared/types/store';

export const selectToken = (state: AppState) => {
  return state.auth.token;
};

export const selectRefreshToken = (state: AppState) => {
  return state.auth.refreshToken;
};
