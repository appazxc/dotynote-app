import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

export const useCreatePost = (id: number) => {
  return useMutation({
    mutationFn: (note: Partial<NoteEntity>) => {
      return api.post<string>(`/notes/${id}/posts`, note);
    },
  });
};
