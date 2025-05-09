import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const usePinnedPostsCount = (parentId: string, enabled?: boolean) => {
  return useQuery(options.posts.loadPinnedPostsCount(parentId, { enabled: enabled ?? true }));
};
