import { Box } from '@chakra-ui/react';
import {
  GetNextPageParamFunction,
  GetPreviousPageParamFunction,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { api } from 'shared/api';
import { useScrollContext } from 'shared/components/ScrollProvider/useScrollContext';
import { DIRECTIONS } from 'shared/constants/requests';
import { sec } from 'shared/constants/time';
import { useSaveNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useSaveNoteTabQueryKey';
import { PageParam, QueryFnData } from 'shared/types/query';
import { getCursorName } from 'shared/util/api/getCursorName';

export type InfinityNoteFilters = Record<string, any>;

export type InfinityNotesOptions = {
  disablePagination?: boolean;
} & InfinityQueryOptions;

export type InfinityQueryOptions= Omit<
UseInfiniteQueryOptions<any, any, any, any, any, PageParam>,
'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
>;

type Props = {
  noteId: string;
  path: string;
  filters: InfinityNoteFilters;
  options?: InfinityNotesOptions;
  internalLevel?: number;
  disablePagination?: boolean;
  getQueryKey: (noteId: string, filters: InfinityNoteFilters, internalLevel?: number) => readonly any[];
}

const initialPageParam: PageParam = {
  cursor: null,
  direction: null,
};

const ROOT_MARGIN = '400px';

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

export const useInfinityNoteList = (props: Props) => {
  const { noteId, path, filters, options, internalLevel, getQueryKey, disablePagination } = props;
  const scrollRef = useScrollContext();

  const [ nextRef, inViewNext ] = useInView({
    rootMargin: ROOT_MARGIN,
    root: scrollRef?.current,
  });
  const [ prevRef, inViewPrev ] = useInView({
    rootMargin: ROOT_MARGIN,
    root: scrollRef?.current,
  });
  
  const queryKey = React.useMemo(
    () => getQueryKey(noteId, filters, internalLevel), 
    [noteId, filters, getQueryKey, internalLevel]
  );

  useSaveNoteTabQueryKey(noteId, queryKey);

  const query = useInfiniteQuery({
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

      const items = await api.get<string[]>(path, apiFilters);

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

  const { 
    isError, 
    errorUpdatedAt, 
    hasPreviousPage, 
    fetchPreviousPage,
    fetchNextPage, 
    hasNextPage,
    data,
    isFetching,
    isFetched,
  } = query;

  React.useEffect(() => {
    const couldFetchOnError = !isError || isError && Date.now() - errorUpdatedAt > 30 * sec;

    if (inViewPrev && hasPreviousPage && couldFetchOnError && !disablePagination) {      
      fetchPreviousPage();
    }
  }, [isError, errorUpdatedAt, fetchPreviousPage, inViewPrev, hasPreviousPage, disablePagination]);

  React.useEffect(() => {
    const couldFetchOnError = !isError || isError && Date.now() - errorUpdatedAt > 30 * sec;

    if (inViewNext && hasNextPage && couldFetchOnError && !disablePagination) {
      fetchNextPage();
    }
  }, [isError, errorUpdatedAt, fetchNextPage, inViewNext, hasNextPage, disablePagination]);

  const flatData = React.useMemo(() => ((data?.pages?.map(({ items }) => items).reverse() || []).flat()), [data]);
  const isFetchingFirstTime = isFetching && !isFetched;
  const nextPageObserver = !isFetching && hasNextPage && !disablePagination ? <Box ref={nextRef} /> : null;
  const prevPageObserver = !isFetching && hasPreviousPage && !disablePagination ? <Box ref={prevRef} /> : null;

  return { 
    ...query, 
    flatData, 
    isFetchingFirstTime,
    nextPageObserver,
    prevPageObserver,
  };
};
