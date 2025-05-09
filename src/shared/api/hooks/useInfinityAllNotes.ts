import {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import React from 'react';

import { api } from 'shared/api';
import { EMPTY_OBJECT } from 'shared/constants/common';
import { DIRECTIONS } from 'shared/constants/requests';
import { useSaveNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useSaveNoteTabQueryKey';
import { PageParam, QueryFnData } from 'shared/types/query';
import { getCursorName } from 'shared/util/api/getCursorName';

type Filters = Record<string, string | number>;

export type InfinityAllNotesOptions = Omit<
  UseInfiniteQueryOptions<any, any, any, any, any, PageParam>,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
>;

const initialPageParam: PageParam = {
  cursor: null,
  direction: null,
};

const getPreviousPageParam: GetPreviousPageParamFunction<PageParam, QueryFnData> = 
  (lastPage, _allPages, _pageParam, _allPageParams) => {
    const result = lastPage.hasPrevPage
      ? { cursor: lastPage.items[lastPage.items.length - 1], direction: DIRECTIONS.PREVIOUS } 
      : null;

    return result;
  };

const getNextPageParam: GetNextPageParamFunction<PageParam, QueryFnData> = 
  (firstPage, _allPages, _pageParam, _allPageParams) => {
    const result = firstPage.hasNextPage
      ? { cursor: firstPage.items[0], direction: DIRECTIONS.NEXT } 
      : null;
  
    return result;
  };

export const getInfinityAllNotesQueryKey = (noteId: string = '', filters: Filters = {}) => 
  ['posts', noteId, 'all-notes', filters] as const;

export type InfinityAllNotesQueryKey = ReturnType<typeof getInfinityAllNotesQueryKey>;

export const useInfinityAllNotes = (
  noteId: string,
  filters: Filters = EMPTY_OBJECT, 
  options: InfinityAllNotesOptions = EMPTY_OBJECT
) => {
  const queryKey = React.useMemo(
    () => getInfinityAllNotesQueryKey(noteId, filters), 
    [noteId, filters]
  );

  useSaveNoteTabQueryKey(noteId, queryKey);

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { cursor, direction } = pageParam;

      const pageSize = filters.pageSize;

      const apiFilters = {
        ...filters,
      };

      if (cursor && direction) {
        apiFilters[getCursorName(direction)] = cursor;
      }

      const items = await api.get<string[]>(`/notes/${noteId}/all`, apiFilters);

      const isNextDirection = direction === DIRECTIONS.NEXT;
      const isPrevDirection = direction === DIRECTIONS.PREVIOUS;
      const isMaxPageSize = items.length === Number(pageSize);
      const hasNextPage = isNextDirection && isMaxPageSize;
      const hasPrevPage = (isPrevDirection || !direction) && isMaxPageSize;

      return {
        items,
        hasPrevPage,
        hasNextPage,
      };
    },
    getPreviousPageParam,
    getNextPageParam,
    initialPageParam,
    ...options,
  });
};
