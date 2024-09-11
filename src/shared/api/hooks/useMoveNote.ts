import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { toast } from 'shared/util/toast';

type Params = {
  postIds: number[],
  parentId: number,
  place?: 'top' | 'bottom',
  concretePostId?: number
}

export const useMoveNote = () => {
  return useMutation({
    mutationFn: (params: Params) => {
      return api.post('/posts/move', params);
    },
    onError: () => {
      toast({ title: 'Error', status: 'error' });
    },
  });
};
