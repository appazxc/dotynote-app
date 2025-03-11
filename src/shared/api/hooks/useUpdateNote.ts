import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = (noteId) => ['updateNote', noteId];

export const useUpdateNote = (noteId) => {
  return useMutation({
    mutationKey: updateNoteMutationKey(noteId),
    mutationFn: ({ id, data }: { id: number; data: Partial<NoteEntity> }) => {
      return entityApi.note.update(id, data);
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
    retryDelay: attempt => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
    retry: 1,
  });
};
