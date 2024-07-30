import { useMutation } from '@tanstack/react-query';

import { toast } from 'shared/util/toast';

import { entityApi } from '../entityApi';

type Params = {
  fromNoteId: string,
  noteIds: string[],
  parentId: string,
}

export const useStickNote = () => {
  return useMutation({
    mutationFn: (params: Params) => {
      return entityApi.stickNote.create(params);
    },
    onError: () => {
      toast({ title: 'Error', status: 'error' });
    },
    meta: {
      hello: 2,
    },
  });
};
