import { InfinityPostsQueryKey, PageParam, QueryFnData } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';

export const updateInfinityQuery = <T extends {
  pageParams: PageParam[];
  pages: QueryFnData[];
}>(
    queryKey: InfinityPostsQueryKey | undefined, 
    updater: (oldData: T | undefined, queryKey: InfinityPostsQueryKey) => T | undefined
  ) => {
  if (!queryKey) {
    return;
  }

  queryClient.setQueryData<T>(queryKey, (oldData) => updater(oldData, queryKey));
};