import { useMutation } from '@tanstack/react-query';

import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';

import { entityApi } from '../entityApi';

export const deleteNoteMutationKey = () => ['deleteNote'];

export const useDeleteNotes = (id: number | number[]) => {
  return useMutation({
    mutationKey: deleteNoteMutationKey(),
    mutationFn: () => {
      return entityApi.note.deleteMany(Array.isArray(id) ? id : [id], { deleteFlag: true });
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
