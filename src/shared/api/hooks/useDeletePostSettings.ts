import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';

import { entityApi } from '../entityApi';

export const useDeletePostSettings = (id: IdentityType) => {
  return useMutation({
    mutationFn: (_?: null) => {
      return entityApi.note.deleteRelation(id, 'postSettings');
    },
  });
};
