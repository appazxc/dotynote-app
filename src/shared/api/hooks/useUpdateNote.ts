import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { entityApi } from '../entityApi';

export const updateNoteMutationKey = (id: IdentityType): (string | number)[] => ['note', id];

export const useUpdateNote = (id: IdentityType) => {
  return useMutation({
    mutationKey: updateNoteMutationKey(id),
    mutationFn: (note: Partial<NoteEntity>) => {
      return entityApi.note.update(id, note);
    },
  });
};
