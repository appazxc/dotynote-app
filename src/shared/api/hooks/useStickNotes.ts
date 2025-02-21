import { useMutation } from '@tanstack/react-query';

import { stickNotes } from 'shared/actions/stickNotes';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useAppDispatch } from 'shared/store/hooks';

type Params = {
  noteId?: number | null;
  postIds: number[];
  parentId: number;
  concretePostId?: number;
  place?: 'top' | 'bottom';
}

export const useStickNotes = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (params: Params) => {
      return dispatch(stickNotes(params));
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({ description: apiError.message, type: 'error' });
    },
  });
};
