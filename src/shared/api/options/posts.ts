import { queryOptions } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export type LoadListFilters = {
  parentId: string,
}

export const loadList = (filters: LoadListFilters) => {
  return queryOptions({
    queryKey: ['posts', filters],
    queryFn: async () => {
      return entityApi.post.loadList({ filters });
    },
  });
};
