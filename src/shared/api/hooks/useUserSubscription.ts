import { useQuery } from '@tanstack/react-query';

import { api } from 'shared/api';

export const useUserSubscription = () => {
  return useQuery({
    queryKey: ['userSubscription'],
    queryFn: () => {
      return api.get<string>('/subscriptions/my/active');
    },
  });
};
