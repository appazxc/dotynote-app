import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';

export const useCreatePostDot = (id: number) => {
  return useMutation({
    mutationFn: (data: { text: string }) => {
      return api.post<string>(`/posts/${id}/dots`, data);
    },
    onError: () => {
      toaster.create({
        description: 'Failed to create dot',
        type: 'error',
      });
    },
  });
};
