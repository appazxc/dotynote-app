import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { useUserBalance } from 'shared/api/hooks/useUserBalance';
import { toaster } from 'shared/components/ui/toaster';

export const useFreePlanUpgrade = () => {
  const { refetch } = useUserBalance();

  return useMutation({
    mutationFn: async () => {
      await api.post('/subscriptions/free-plan-upgrade');
      await refetch();
    },
    onSuccess: async () => {

      toaster.create({
        type: 'success',
        description: 'Plan upgraded successfully',
      });
    },
    onError: () => {
      toaster.create({
        type: 'error',
        description: 'Failed to upgrade plan',
      });
    },
  });
};
