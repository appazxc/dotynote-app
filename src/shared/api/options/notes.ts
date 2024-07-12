import { queryOptions } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';

import { entityApi } from '../entityApi';

// need for show tab titles
export const tabNotes = (spaceId?: IdentityType) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: async () => {
      return entityApi.note.loadTabNotes(spaceId);
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
