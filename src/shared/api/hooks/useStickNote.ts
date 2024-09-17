import { useMutation } from '@tanstack/react-query';

import { stickNote } from 'shared/actions/stickNote';
import { api } from 'shared/api';
import { useAppDispatch } from 'shared/store/hooks';
import { toast } from 'shared/util/toast';

type Params = {
  fromNoteId: number | null,
  noteIds: number[],
  parentId: number,
  concretePostId?: number,
  place?: 'top' | 'bottom',
}

export const useStickNote = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (params: Params) => {
      return dispatch(stickNote(params));
    },
    onError: () => {
      toast({ title: 'Error', status: 'error' });
    },
  });
};
