import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';
import { LoadListFilters } from 'shared/api/options/posts';
import { IdentityType } from 'shared/types/entities/BaseEntity';

type Filters = Omit<LoadListFilters, 'parentId'>;

export const usePosts = (noteId: IdentityType, filters: Filters = {}) => {
  return useQuery(options.posts.loadList({ parentId: noteId, ...filters }));
};
