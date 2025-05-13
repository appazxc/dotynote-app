import { useMutation } from '@tanstack/react-query';

import { movePosts } from 'shared/actions/movePosts';
import { queryClient } from 'shared/api/queryClient';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { 
  getInfinityStickTypeQueryKey, 
  InfinityStickTypeQueryKey, 
} from 'shared/modules/noteTab/components/StickTypeList';
import { useGetNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useGetNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';
import { pasteIdsInConretePlace, updateInfinityQuery } from 'shared/util/api/updateInfinityQuery';

type Params = {
  postIds: string[];
  fromNoteId: string;
} & (
  { concretePostId: string; place: 'top' | 'bottom' } |
  { concretePostId?: never; place?: never }
);

export const useMovePosts = (noteId: string) => {
  const dispatch = useAppDispatch();
  const getQueryKey = useGetNoteTabQueryKey(noteId);
  
  return useMutation({
    mutationFn: async (params: Params) => {
      const ids = await dispatch(movePosts({ ...params, parentId: noteId }));

      const {
        postIds,
        fromNoteId,
        place,
        concretePostId,
      } = params;

      if (concretePostId) {
        updateInfinityQuery(getQueryKey(), pasteIdsInConretePlace({ ids, concretePostId, place }));
      } else {
        activateInfinityQueryNextPage(getQueryKey());
      }
      // remove old posts from the list
      queryClient
        .getQueriesData({ queryKey: getInfinityStickTypeQueryKey(fromNoteId) })
        .forEach(([queryKey]) => {
          updateInfinityQuery(queryKey as InfinityStickTypeQueryKey, (oldData) => {
            if (!oldData) {
              return oldData;
            }
      
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                return {
                  ...page,
                  items: page.items.filter((id) => !postIds.includes(id)),
                };
              }),
            };
          });
        });

      return ids;
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({ description: apiError.message });
    },
  });
};
