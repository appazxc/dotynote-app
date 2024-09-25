import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { movePosts } from 'shared/actions/movePosts';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

type Params = {
  postIds: number[],
  parentId: number,
  fromNoteId: number,
  place?: 'top' | 'bottom',
  concretePostId?: number
}

export const useMovePosts = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (params: Params) => {
      return dispatch(movePosts(params));
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toast({ description: apiError.message, status: 'error' });
    },
  });
};
