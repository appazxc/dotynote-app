import { useMutation } from '@tanstack/react-query';

import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

import { entityApi } from '../entityApi';

export const useCreatePostsSettings = (noteId: number) => {
  return useMutation({
    mutationFn: (postsSettings: Partial<PostsSettingsEntity>) => {
      return entityApi.note.createRelation(noteId, 'postsSettings', postsSettings);
    },
  });
};
