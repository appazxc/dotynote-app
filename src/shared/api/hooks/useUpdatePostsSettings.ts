import { useMutation } from '@tanstack/react-query';

import { entityApi } from 'shared/api/entityApi';
import { postsSettingsSelector } from 'shared/selectors/entities';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

export const updateUserMutationKey = (id: string) => ['postsSettings', id];

export const useUpdatePostsSettings = (noteId: number, id: string) => {
  return useMutation({
    mutationKey: updateUserMutationKey(id),
    mutationFn: (data: Partial<PostsSettingsEntity>) => {
      return entityApi.note.updateRelation(`/${noteId}/posts-settings`, id, data, postsSettingsSelector);
    },
  });
};
