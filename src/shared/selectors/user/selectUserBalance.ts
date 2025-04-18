import { AppState } from 'shared/types/store';

import { selectUser } from './selectUser';

export const selectUserBalance = (state: AppState) => {
  const user = selectUser(state);
  const balance = user?.balance;

  if (!balance) {
    return null;
  }
  
  return balance;
};
