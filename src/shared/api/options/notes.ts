import { queryOptions } from '@tanstack/react-query';

import { entityApi } from '../entityApi';
import { api } from 'shared/api';

// need for show tab titles
export const tabNotes = (spaceId: string | undefined, router, noteRoutePath) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: async () => {
      return entityApi.note.loadTabNotes(spaceId, router, noteRoutePath);
    },
  });
};

export const load = (id?: number | null) => {
  return queryOptions({
    queryKey: ['note', id],
    queryFn: async () => {
      return entityApi.note.load(id!);
    },
    enabled: !!id,
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
      return entityApi.note.loadList<number>({ filters });
    },
  });
};

export const loadOrderByList = () => {
  return queryOptions({
    queryKey: ['orderBy'],
    queryFn: async () => {
      return api.get<number[]>('/notes/posts-settings/order-by');
    },
  });
};
