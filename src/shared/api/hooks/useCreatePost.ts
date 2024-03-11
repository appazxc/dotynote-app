import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const useCreatePost = (id: IdentityType) => {
  return useMutation({
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.createRelation(id, 'posts', note);
    },
  });
};
