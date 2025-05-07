import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

export const useCreatePostsSettings = (noteId: string) => {
  return useMutation({
    mutationFn: (postsSettings: Partial<PostsSettingsEntity>) => {
      return api.post<string>(`/notes/${noteId}/postsSettings`, postsSettings);
    },
  });
};
