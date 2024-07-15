import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';
import { LoadListFilters } from 'shared/api/options/posts';

type Filters = Omit<LoadListFilters, 'parentId'>;

export const usePosts = (noteId: string, filters: Filters = {}) => {
  return useQuery(options.posts.loadList({ parentId: noteId, ...filters }));
};
