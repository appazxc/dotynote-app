import { InfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { TQueryFnData } from 'shared/types/query';

export const activateInfinityQueryNextPage = (queryKey?: InfinityPostsQueryKey) => {
  if (!queryKey) {
    return;
  }

  const queryData = queryClient.getQueryData<TQueryFnData>(queryKey);

  if (!queryData) {
    return;
  }

  const isEmpty = queryData.pageParams.length === 1 
      && queryData.pages.length === 1 
      && queryData.pages[0].items.length === 0;

  if (isEmpty) {
    queryClient.invalidateQueries({ queryKey: queryKey });
    return;
  }

  queryClient.setQueryData<TQueryFnData>(queryKey, (oldData) => {
    if (!oldData) {
      return oldData;
    }
    console.log('oldData', oldData);
    const filtersIndex = 2;
    const descSort = queryKey[filtersIndex]?.sort === 'desc';
    
    // return undefined

    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        ...descSort ? {
          hasNextPage: true,
        } : {
          hasPrevPage: true,
        },
      })),
    };
  });
};