import { useMutation } from '@tanstack/react-query';

import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = (id: number) => ['updateNote', id];

export const useUpdateNote = (id: number) => {
  return useMutation({
    mutationKey: updateNoteMutationKey(id),
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.update(id, note);
    },
  });
};
