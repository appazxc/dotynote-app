import { useMutation } from '@tanstack/react-query';

import { deletePostsNotes } from 'shared/actions/post/deletePostNotes';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostsMutationKey = (parentId: number) => ['deletePosts', parentId];

export const useDeletePosts = (parentId: number) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostsMutationKey(parentId),
    mutationFn: async (postIds: number[]) => {
      return dispatch(deletePostsNotes(parentId, postIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
