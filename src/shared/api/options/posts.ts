import { queryOptions } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';

import { entityApi } from '../entityApi';

export type LoadListFilters = {
  parentId: IdentityType,
}

export const loadList = (filters: LoadListFilters) => {
  return queryOptions({
    queryKey: ['posts', filters],
    queryFn: async () => {
      return entityApi.post.loadList({ filters });
    },
  });
};
