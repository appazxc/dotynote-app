import { useMutation } from '@tanstack/react-query';

import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = (id: string): (string | string)[] => ['note', id];

export const useUpdateNote = (id: string) => {
  return useMutation({
    mutationKey: updateNoteMutationKey(id),
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.update(id, note);
    },
  });
};
