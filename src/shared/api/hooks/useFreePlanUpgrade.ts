import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';

import { api } from '..';

export const useFreePlanUpgrade = () => {
  
  return useMutation({
    mutationFn: () => {
      return api.post('/subscriptions/free-plan-upgrade');
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
