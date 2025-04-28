import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

export const useCreatePost = (id: number) => {
  return useMutation({
    mutationFn: (note: Partial<NoteEntity>) => {
      return api.post<number>(`/notes/${id}/posts`, note);
    },
    onError: (error) => {
      const parsedError = parseApiError(error);

      toaster.create({
        description: parsedError.message,
        type: 'info',
      });
    },
  });
};
