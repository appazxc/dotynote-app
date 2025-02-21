import { InfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';

type Store = {
  scroll?: number;
  queryKey: InfinityPostsQueryKey;
}

export const noteTabStore = new Map<string, Store>();