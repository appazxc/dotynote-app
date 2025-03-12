import { useMutation } from '@tanstack/react-query';

import { movePosts } from 'shared/actions/movePosts';
import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { useGetNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useGetNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { updateInfinityQuery } from 'shared/util/api/updateInfinityQuery';

type Params = {
  postIds: number[];
  parentId: number;
  fromNoteId: number;
  place?: 'top' | 'bottom';
  concretePostId?: number;
}

export const useMovePosts = (noteId: number) => {
  const dispatch = useAppDispatch();
  const getQueryKey = useGetNoteTabQueryKey(noteId);
  
  return useMutation({
    mutationFn: async (params: Params) => {
      const ids = await dispatch(movePosts(params));

      const {
        postIds,
        parentId,
        fromNoteId,
        place,
        concretePostId,
      } = params;
      const isSameNote = parentId === fromNoteId;

      if (concretePostId) {
        updateInfinityQuery(getQueryKey(), (oldData, queryKey) => {
          if (!oldData) {
            return oldData;
          }
      
          const filtersIndex = 2;
          const descSort = queryKey[filtersIndex]?.sort === 'desc';
      
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              ...descSort ? {
                hasNextPage: true,
              } : {
                hasPrevPage: true,
              },
              items: page.items,
            })),
          };
        });
      } else {
        queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(parentId).slice(0, 2) });
        if (!isSameNote) {
          queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(fromNoteId).slice(0, 2) });
        }
      }

      return ids;
    },
    onError: (error) => {
      const apiError = parseApiError(error);

      toaster.create({ description: apiError.message, type: 'error' });
    },
  });
};
