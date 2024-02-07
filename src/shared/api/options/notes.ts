import { queryOptions } from '@tanstack/react-query';

import { entityApi } from '../entityApi';
import { queryClient } from '../queryClient';

import { options } from '.';

// need for show tab titles
export const tabNotes = (spaceId?: string) => {
  return queryOptions({
    queryKey: ['tabNotes', spaceId],
    queryFn: async () => {
      const tabIds = await queryClient.fetchQuery(options.spaceTabs.list({ spaceId }));
      return entityApi.note.loadTabNotes(tabIds);
    },
  });
};

export type LoadListFilters = {
  query?: string,
  userId?: string,
}

export const loadList = (filters: LoadListFilters = {}) => {
  return queryOptions({
    queryKey: ['notes', filters],
    queryFn: async () => {
      return entityApi.note.loadList({ filters });
    },
  });
};
