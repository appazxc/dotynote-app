import { useInfiniteQuery, UseInfiniteQueryOptions } from '@tanstack/react-query';
import React from 'react';

import { EMPTY_OBJECT } from 'shared/constants/common';
import { DEFAULT_PAGE_SIZE, Directions, DIRECTIONS } from 'shared/constants/requests';
import { useSaveNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useSaveNoteTabQueryKey';
import { getCursorName } from 'shared/util/api/getCursorName';

import { entityApi } from '../entityApi';

type Filters = Record<string, string | number>;

export type PageParam = { 
  cursor?: number | null,
  direction?: Directions | null, 
}

const initialPageParam: PageParam = {
  cursor: null,
  direction: null,
};

export type InfinityPostsOptions = Omit<
  UseInfiniteQueryOptions<any, any, any, any, any, PageParam>,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
>;

export const getInfinityPostsQueryKey = (noteId: number | string = '', filters: Filters = {}) => 
  ['posts', noteId, filters];

export const useInfinityPosts = (
  noteId: number,
  filters: Filters = EMPTY_OBJECT, 
  options: InfinityPostsOptions = EMPTY_OBJECT
) => {
  const queryKey = React.useMemo(
    () => getInfinityPostsQueryKey(noteId, filters), 
    [noteId, filters]
  );

  useSaveNoteTabQueryKey(noteId, queryKey);

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { cursor, direction } = pageParam;

      const apiFilters = {
        parentId: noteId,
        ...filters,
      };

      if (cursor && direction) {
        apiFilters[getCursorName(direction)] = cursor;
      }

      return entityApi.post.loadList<number>({ filters: apiFilters });
    },
    getPreviousPageParam: (lastPage, _allPages, _pageParam, _allPageParams) => {
      const result = lastPage.length === DEFAULT_PAGE_SIZE 
        ? { cursor: lastPage[lastPage.length - 1], direction: DIRECTIONS.PREVIOUS } 
        : null;

      return result;
    },
    getNextPageParam: (firstPage, _allPages, pageParam, allPageParams) => {
      const loadedOnlyPreviousPage = allPageParams.length === 1 
      && allPageParams[0].direction === DIRECTIONS.PREVIOUS;
        
      const result = (firstPage.length === DEFAULT_PAGE_SIZE && pageParam.direction) || loadedOnlyPreviousPage
        ? { cursor: firstPage[0], direction: DIRECTIONS.NEXT } 
        : null;
      
      return result;
    },
    initialPageParam,
    ...options,
  });
};
