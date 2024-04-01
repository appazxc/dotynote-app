import { queryOptions } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';

import { entityApi } from '../entityApi';
import { queryClient } from '../queryClient';

import { options } from '.';

// need for show tab titles
export const tabNotes = (spaceId?: IdentityType) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: async () => {
      const tabIds = await queryClient.fetchQuery(options.spaceTabs.list({ spaceId }));
      return entityApi.note.loadTabNotes(tabIds);
    },
  });
};

export const load = (id?: string | number) => {
  return queryOptions({
    queryKey: ['note', id],
    queryFn: async () => {
      return entityApi.note.load(id);
    },
  });
};

export type LoadListFilters = {
  query?: string,
  authorId?: string,
  access?: string,
  pageSize?: number,
}

export const loadList = (filters: LoadListFilters = {}) => {
  return queryOptions({
    queryKey: ['notes', filters],
    queryFn: async () => {
      return entityApi.note.loadList({ filters });
    },
  });
};
