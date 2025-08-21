import { AppState } from 'shared/types/store';

export const selectUserBalance = (state: AppState) => {
  return state.user.balance;
};
