import { queryOptions, UndefinedInitialDataOptions } from '@tanstack/react-query';

import { api } from 'shared/api';

export const getPinnedPostsCountQueryKey = (parentId: string) => ['postsCount', parentId];

export const loadPinnedPostsCount = (parentId: string, options: Partial<UndefinedInitialDataOptions>) => {
  return queryOptions({
    ...options,
    queryKey: getPinnedPostsCountQueryKey(parentId),
    queryFn: async () => {
      return api.get<string>('/posts/pinned-count', { parentId });
    },
  });
};
