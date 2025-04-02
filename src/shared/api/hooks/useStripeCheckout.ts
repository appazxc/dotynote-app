import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';

interface CheckoutParams {
  planId: string;
  cancelUrl?: string;
  successUrl?: string;
}

export const useStripeCheckout = () => {
  return useMutation({
    mutationFn: async (params: CheckoutParams) => {
      return api.post<{ url: string }>('/subscriptions/checkout', params);
    },
  });
};
