import { queryOptions } from '@tanstack/react-query';

import { api } from 'shared/api';

import { entityApi } from '../entityApi';

// need for show tab titles
export const tabNotes = (spaceId: string | undefined, router) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: async () => {
      return entityApi.note.loadTabNotes(spaceId, router);
    },
  });
};

export const load = (id?: string | null) => {
  return queryOptions({
    queryKey: ['note', id],
    queryFn: async () => {
      return entityApi.note.load(id!);
    },
    enabled: !!id,
  });
};

export type LoadListFilters = {
  query?: string;
  authorId?: string;
  access?: string;
  pageSize?: number;
}

export const loadList = (filters: LoadListFilters = {}) => {
  return queryOptions({
    queryKey: ['notes', filters],
    queryFn: async () => {
      return entityApi.note.loadList<string>({ filters });
    },
  });
};