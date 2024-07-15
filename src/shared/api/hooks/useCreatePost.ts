import { useMutation } from '@tanstack/react-query';

import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const useCreatePost = (id: string) => {
  return useMutation({
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.createRelation(id, 'posts', note);
    },
  });
};
