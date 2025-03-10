import { useMutation } from '@tanstack/react-query';

import { stickNotesAndPosts } from 'shared/actions/stickNotesAndPosts';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useGetNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useGetNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';
import { pasteIdsInConretePlace, updateInfinityQuery } from 'shared/util/api/updateInfinityQuery';

type Params = {
  noteIds: number[];
  postIds: number[];
  concretePostId?: number;
  place?: 'top' | 'bottom';
}

export const useStickNotesAndPosts = (parentId: number) => {
  const dispatch = useAppDispatch();
  const getQueryKey = useGetNoteTabQueryKey(parentId);
  
  return useMutation({
    mutationFn: async (params: Params) => {
      const ids = await dispatch(stickNotesAndPosts({ ...params, parentId }));

      const {
        concretePostId,
        place,
      } = params;

      if (concretePostId) {
        updateInfinityQuery(getQueryKey(), pasteIdsInConretePlace({ ids, concretePostId, place }));
      } else {
        activateInfinityQueryNextPage(getQueryKey());
      }
              
      return ids;
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({ description: apiError.message, type: 'error' });
    },
  });
};
