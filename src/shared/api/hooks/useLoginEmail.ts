import { useMutation } from '@tanstack/react-query';

import { api } from '..';

export const useLoginEmail = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return api.post<{ 
        needReferral: boolean, 
        // code returned if developer mode is enabled
        code?: string 
      }>('/auth/login/email', { email });
    },
  });
};
