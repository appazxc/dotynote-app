import { getInfinityPostsQueryKey, InfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { DEFAULT_PAGE_SIZE } from 'shared/constants/requests';
import { TQueryFnData } from 'shared/types/query';
import { restorePagesStructure } from 'shared/util/api/restorePagesStructure';
import { updateInfinityQuery } from 'shared/util/api/updateInfinityQuery';

export const removePostIdsFromQuery = (parentId: string, postIds: string[], resetEmptyQueries = true) => {
  const queriesData: {
    queryKey: InfinityPostsQueryKey;
    data?: TQueryFnData;
  }[] = [];

  queryClient
    .getQueriesData({ queryKey: getInfinityPostsQueryKey(parentId) })
    .forEach(([queryKey]) => {
      updateInfinityQuery(queryKey as InfinityPostsQueryKey, (oldData, queryKey) => {
        queriesData.push({
          queryKey,
          data: oldData,
        });
        if (!oldData) {
          return oldData;
        }

        const FILTERS_INDEX = 2;
        const filters = queryKey[FILTERS_INDEX];
        const pageSize = Number(filters?.pageSize) || DEFAULT_PAGE_SIZE;
        const newPages = oldData.pages.map((page) => {
          return {
            ...page,
            items: page.items.filter((id) => !postIds.includes(id)),
          };
        });

        return {
          ...oldData,
          pages: restorePagesStructure(newPages, pageSize),
        };
      });
    });

  // reset queries if they are empty
  if (resetEmptyQueries) {
    queryClient
      .getQueriesData({ queryKey: getInfinityPostsQueryKey(parentId) })
      .forEach(([queryKey]) => {
        const queryData = queryClient.getQueryData<TQueryFnData>(queryKey);

        if (!queryData) {
          return;
        }
    
        const isEmpty = queryData.pages.length === 1 
          && queryData.pages[0].items.length === 0;
    
        if (isEmpty) {
          queryClient.resetQueries({ queryKey: queryKey });
          return;
        }
      });
  }

  const revert = () => {
    queriesData.forEach(({ queryKey, data }) => {
      updateInfinityQuery(queryKey, () => {
        return data;
      });
    });
  };

  return revert;
};