import { useMutation } from '@tanstack/react-query';

import { deleteNotesFromPosts } from 'shared/actions/post/deleteNotesFromPosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostsMutationKey = (parentId: string) => ['deletePosts', parentId];

export const useDeleteNotesFromPosts = (parentId: string) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostsMutationKey(parentId),
    mutationFn: async (postIds: string[]) => {
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
