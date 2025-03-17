import { useMutation } from '@tanstack/react-query';

import { deleteNotesFromPosts } from 'shared/actions/post/deleteNotesFromPosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostsMutationKey = (parentId: number) => ['deletePosts', parentId];

export const useDeleteNotesFromPosts = (parentId: number) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostsMutationKey(parentId),
    mutationFn: async (postIds: number[]) => {
      return dispatch(deleteNotesFromPosts(parentId, postIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
