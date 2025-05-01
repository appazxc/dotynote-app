import { useMutation } from '@tanstack/react-query';

import { api } from '..';

export const useLoginEmail = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return api.post<{ needReferral: boolean }>('/auth/login/email', { email });
    },
  });
};
