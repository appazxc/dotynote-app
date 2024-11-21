import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';

export const useCreateNoteDot = (id: number) => {
  return useMutation({
    mutationFn: (data: { text: string }) => {
      return api.post<string>(`/notes/${id}/dots`, data);
    },
    onError: () => {
      toaster.create({
        description: 'Failed to create dot',
        type: 'error',
      });
    },
  });
};
