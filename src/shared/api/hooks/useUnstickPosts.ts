import { useMutation } from '@tanstack/react-query';

import { unstickPosts } from 'shared/actions/post/unstickPosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

export const useUnstickPosts = (parentId: number, postIds: number[]) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: () => {
      return dispatch(unstickPosts(parentId, postIds));
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({
        description: apiError.message,
        type: 'error',
      });
    },
  });
};
