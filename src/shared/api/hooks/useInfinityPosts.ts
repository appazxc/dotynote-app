import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadListFilters } from 'shared/api/options/posts';
import { DEFAULT_PAGE_SIZE, LoadMoreDirection, loadMoreDirection } from 'shared/constants/requests';
import { useSaveNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useSaveNoteTabQueryKey';
import { getCursorName } from 'shared/util/api/getCursorName';

import { entityApi } from '../entityApi';

type Filters = Omit<LoadListFilters, 'parentId'>;

export type PageParam = { 
  cursor?: string | null,
  direction?: LoadMoreDirection | null, 
}

const initialPageParam: PageParam = 
{
  cursor: null,
  direction: null,
};

export const getInfinityPostsQueryKey = (noteId: number, filters: Filters = {}) => ['posts', noteId, filters];

export const useInfinityPosts = (noteId: number, filters: Filters = {}) => {
  const queryKey = React.useMemo(
    () => getInfinityPostsQueryKey(noteId, filters), 
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
    getPreviousPageParam: (lastPage, allPages, pageParam, allPageParams) => {
      const result = lastPage.length === DEFAULT_PAGE_SIZE 
        ? { cursor: lastPage[lastPage.length - 1], direction: loadMoreDirection.PREVIOUS } 
        : null;

      return result;
    },
    getNextPageParam: (firstPage, allPages, pageParam, allPageParams) => {
      const loadedOnlyPreviousPage = allPageParams.length === 1 
      && allPageParams[0].direction === loadMoreDirection.PREVIOUS;
        
      const result = (firstPage.length === DEFAULT_PAGE_SIZE && pageParam.direction) || loadedOnlyPreviousPage
        ? { cursor: firstPage[0], direction: loadMoreDirection.NEXT } 
        : null;

      // console.log('getNextPageParam result', result, firstPage, allPages,firstPageParam, allPageParams);
      
      return result;
    },
    initialPageParam,
  });
};
