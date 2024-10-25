import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const usePinnedPostsCount = (parentId: number) => {
  return useQuery(options.posts.loadPinnedPostsCount(parentId));
};
