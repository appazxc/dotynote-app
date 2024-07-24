import { useMutation } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const deleteNoteMutationKey = (id: string) => ['deleteNote', id];

export const useDeleteNote = (id: string) => {
  return useMutation({
    mutationKey: ['deleteNote', id],
    mutationFn: () => {
      return entityApi.note.delete(id, { deleteFlag: true });
    },
  });
};
