import { useMutation } from '@tanstack/react-query';

import { deletePosts } from 'shared/actions/post/deletePosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const deletePostsMutationKey = (parentId: number) => ['deletePostNotes', parentId];

export const useDeletePosts = (parentId: number) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: deletePostsMutationKey(parentId),
    mutationFn: async (postIds: number[]) => {
      return dispatch(deletePosts(parentId, postIds));
    },
    onError: (error) => {
      toaster.create({
        description: parseApiError(error).message,
        type: 'error',
      });
    },
  });
};
