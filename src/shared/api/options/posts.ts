import { queryOptions } from '@tanstack/react-query';

import { api } from 'shared/api';

export const getPinnedPostsCountQueryKey = (parentId: number) => ['postsCount', parentId];

export const loadPinnedPostsCount = (parentId: number) => {
  return queryOptions({
    queryKey: getPinnedPostsCountQueryKey(parentId),
    queryFn: async () => {
      return api.get<number>('/posts/pinned-count', { parentId });
    },
  });
};
