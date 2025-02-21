import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = () => ['updateNote'];

export const useUpdateNote = () => {
  return useMutation({
    mutationKey: updateNoteMutationKey(),
    mutationFn: ({ id, data }: { id: number; data: Partial<NoteEntity> }) => {
      return entityApi.note.update(id, data);
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
