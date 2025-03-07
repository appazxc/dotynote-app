import { InfinityPostsQueryKey, PageParam, QueryFnData } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';

export const activateInfinityQueryNextPage = (queryKey?: InfinityPostsQueryKey) => {
  if (!queryKey) {
    return;
  }
  
  queryClient.setQueryData<{
    pageParams: PageParam[];
    pages: QueryFnData[];
  }>(queryKey, (oldData) => {
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
      })),
    };
  });
};