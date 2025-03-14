import { useMutation } from '@tanstack/react-query';

import { deleteNoteFromPosts } from 'shared/actions/post/deleteNoteFromPosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostsMutationKey = (parentId: number) => ['deletePosts', parentId];

export const useDeletePosts = (parentId: number) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostsMutationKey(parentId),
    mutationFn: async (postIds: number[]) => {
      return dispatch(deleteNoteFromPosts(parentId, postIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
