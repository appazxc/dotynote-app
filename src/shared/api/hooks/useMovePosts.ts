import { useMutation } from '@tanstack/react-query';

import { movePosts } from 'shared/actions/movePosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

type Params = {
  postIds: number[];
  parentId: number;
  fromNoteId: number;
  place?: 'top' | 'bottom';
  concretePostId?: number;
}

export const useMovePosts = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (params: Params) => {
      return dispatch(movePosts(params));
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({ description: apiError.message, type: 'error' });
    },
  });
};
