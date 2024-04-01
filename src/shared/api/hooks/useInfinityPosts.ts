import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadListFilters } from 'shared/api/options/posts';
import { LoadMoreDirection, DEFAULT_PAGE_SIZE, loadMoreDirection } from 'shared/constants/requests';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { getCursorName } from 'shared/util/api/getCursorName';

import { useSaveNoteTabQueryKey } from 'desktop/modules/space/tabs/note/hooks/useSaveNoteTabQueryKey';

import { entityApi } from '../entityApi';

type Filters = Omit<LoadListFilters, 'parentId'>;

export type PageParam = { 
  cursor?: IdentityType | null,
  direction?: LoadMoreDirection | null, 
}

const initialPageParam: PageParam = 
{
  cursor: null,
  direction: null,
};

export const useInfinityPosts = (noteId: IdentityType, filters: Filters = {}) => {
  const queryKey = React.useMemo(
    () => ['posts', noteId, filters], 
    [noteId, filters]
  );

  useSaveNoteTabQueryKey(queryKey);

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { cursor, direction } = pageParam;

      const apiFilters = {
        parentId: noteId,
        pageSize: DEFAULT_PAGE_SIZE,
        ...filters,
      };

      if (cursor && direction) {
        apiFilters[getCursorName(direction)] = cursor;
      }

      return entityApi.post.loadList({ filters: apiFilters });
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPage.length === DEFAULT_PAGE_SIZE 
        ? { cursor: lastPage[lastPage.length - 1], direction: loadMoreDirection.PREVIOUS } 
        : null;
    },
    getNextPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
      return firstPage.length === DEFAULT_PAGE_SIZE && firstPageParam.cursor
        ? { cursor: firstPage[0], direction: loadMoreDirection.NEXT } 
        : null;
    },
    initialPageParam,
  });
};
