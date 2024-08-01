import { useMutation } from '@tanstack/react-query';

import { toast } from 'shared/util/toast';

import { entityApi } from '../entityApi';

type Params = {
  postIds: number[],
  parentId: number,
  place?: 'top' | 'bottom',
  concretePostId?: number
}

export const useMoveNote = () => {
  return useMutation({
    mutationFn: (params: Params) => {
      return entityApi.movePost.create(params);
    },
    onError: () => {
      toast({ title: 'Error', status: 'error' });
    },
  });
};
