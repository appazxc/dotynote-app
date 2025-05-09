import { 
  GetNextPageParamFunction, 
  GetPreviousPageParamFunction, 
  useInfiniteQuery, 
  UseInfiniteQueryOptions, 
} from '@tanstack/react-query';
import React from 'react';

import { EMPTY_OBJECT } from 'shared/constants/common';
import { DIRECTIONS } from 'shared/constants/requests';
import { useSaveNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useSaveNoteTabQueryKey';
import { PageParam, QueryFnData } from 'shared/types/query';
import { getCursorName } from 'shared/util/api/getCursorName';

import { entityApi } from '../entityApi';

type Filters = Record<string, string | number>;

export type InfinityStickNotesOptions = Omit<
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

export const getInfinityStickNotesQueryKey = (noteId: string = '', filters: Filters = {}) => 
  ['posts', noteId, 'stick-notes', filters] as const;

export type InfinityStickNotesQueryKey = ReturnType<typeof getInfinityStickNotesQueryKey>;

export const useInfinityStickNotes = (
  noteId: string,
  filters: Filters = EMPTY_OBJECT, 
  options: InfinityStickNotesOptions = EMPTY_OBJECT
) => {
  const queryKey = React.useMemo(
    () => getInfinityStickNotesQueryKey(noteId, filters), 
    [noteId, filters]
  );

  useSaveNoteTabQueryKey(noteId, queryKey);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam }) => {
      const { cursor, direction } = pageParam;

      const pageSize = filters.pageSize;

      const apiFilters = {
        parentId: noteId,
        ...filters,
      };

      if (cursor && direction) {
        apiFilters[getCursorName(direction)] = cursor;
      }

      const items = await entityApi.post.loadList<string>({ filters: apiFilters });

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

  return { ...query };
};
