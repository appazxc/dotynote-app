import { userBalanceSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/types/store';

import { selectUser } from './selectUser';

export const selectUserBalance = (state: AppState) => {
  const user = selectUser(state);
  const balanceId = user?.balanceId;
  const balance = userBalanceSelector.getEntityById(state, balanceId);

  if (!balance) {
    return null;
  }
  
  return balance;
};
