import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const useCreateNote = () => {
  return useMutation({
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.create<number>(note);
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
