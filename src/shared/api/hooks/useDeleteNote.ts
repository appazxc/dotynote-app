import { useMutation } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const deleteNoteMutationKey = (id: number) => ['deleteNote', id];

export const useDeleteNote = (id: number) => {
  return useMutation({
    mutationKey: ['deleteNote', id],
    mutationFn: () => {
      return entityApi.note.delete(id, { deleteFlag: true });
    },
  });
};
