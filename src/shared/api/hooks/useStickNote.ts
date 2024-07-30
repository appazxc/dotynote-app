import { useMutation } from '@tanstack/react-query';

import { toast } from 'shared/util/toast';

import { entityApi } from '../entityApi';

type Params = {
  fromNoteId: number,
  noteIds: number[],
  parentId: number,
}

export const useStickNote = () => {
  return useMutation({
    mutationFn: (params: Params) => {
      return entityApi.stickNote.create(params);
    },
    onError: () => {
      toast({ title: 'Error', status: 'error' });
    },
  });
};
