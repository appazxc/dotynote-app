import { InfinityPostsQueryKey, PageParam, QueryFnData } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';

export const turnOnQueryNextPage = (queryKey: InfinityPostsQueryKey) => {
  queryClient.setQueryData<{
    pageParams: PageParam[],
    pages: QueryFnData[],
  }>(queryKey, (oldData) => {
    if (!oldData) {
      return oldData;
    }
    
    const descSort = queryKey[2]?.sort === 'desc';

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
};