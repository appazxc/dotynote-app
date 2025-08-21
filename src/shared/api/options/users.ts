import { queryOptions } from '@tanstack/react-query';

import { api } from 'shared/api';
import { BalanceInfo, setBalance } from 'shared/store/slices/userSlice';
import { AppDispatch } from 'shared/types/store';

export type DeletionRequestStatus = {
  id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  confirmedAt?: string;
  scheduledDeletionAt?: string;
};

export const me = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => {
      return api.get<string>('/users/me');
    },
  });
};

export const userBalance = (dispatch: AppDispatch) => {
  return queryOptions({
    queryKey: ['userBalanceInfo'],
    queryFn: async () => {
      const balance = await api.get<BalanceInfo>('/users/balance-info');
      dispatch(setBalance(balance));
      return balance;
    },
  });
};

export const accountDeletionRequestQueryKey = () => ['user', 'deletion-request'];

export const userDeletionRequest = () => {
  return queryOptions({
    queryKey: accountDeletionRequestQueryKey(),
    queryFn: async (): Promise<DeletionRequestStatus | null> => {
      try {
        return await api.get<DeletionRequestStatus>('/users/deletion-request');
      } catch (error: any) {
        // If no deletion request exists, API returns 404
        if (error?.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
  });
};

export const usernameCheck = (username) => {
  return queryOptions({
    queryKey: ['usernameCheck', username],
    queryFn: () => {
      return api.get<boolean>('/users/check-username', { username });
    },
  });
};