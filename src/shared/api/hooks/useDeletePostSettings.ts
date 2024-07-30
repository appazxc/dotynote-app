import { useMutation } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const useDeletePostSettings = (id: number) => {
  return useMutation({
    mutationFn: (_?: null) => {
      return entityApi.note.deleteRelation(id, 'postSettings');
    },
  });
};
