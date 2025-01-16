import { PageParam, QueryFnData } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';

export const turnOnQueryNextPage = (queryKey: any[]) => {
  queryClient.setQueryData<{
    pageParams: PageParam[],
    pages: QueryFnData[],
  }>(queryKey, (oldData) => {
    if (!oldData) {
      return oldData;
    }

    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        hasNextPage: true,
        items: page.items,
      })),
    };
  });
};