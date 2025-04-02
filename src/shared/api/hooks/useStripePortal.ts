import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';

export const useStripePortal = () => {
  return useMutation({
    mutationFn: async () => {
      return api.post<{ url: string }>('/subscriptions/portal', { returnUrl: window.location.href });
    },
  });
};
