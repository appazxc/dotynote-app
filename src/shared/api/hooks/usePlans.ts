import { useQuery } from '@tanstack/react-query';

import { api } from 'shared/api';

export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: () => {
      return api.get<string[]>('/subscriptions/plans');
    },
  });
};
