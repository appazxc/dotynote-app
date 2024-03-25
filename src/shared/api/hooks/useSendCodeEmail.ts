import { useMutation } from '@tanstack/react-query';

import api from '..';

export const useSendCodeEmail = () => {
  return useMutation({
    mutationFn: (email: string) => {
      return api.post('/auth/send-code-email', { email });
    },
  });
};
