import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

import { LoadListFilters } from 'shared/api/options/posts';
import { LoadMoreDirection, DEFAULT_PAGE_SIZE, loadMoreDirection } from 'shared/constants/requests';
import { noteEmitter, noteEvents } from 'shared/modules/space/tabs/note/util/noteEmitter';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { getCursorName } from 'shared/util/api/getCursorName';

import { useSaveNoteTabQueryKey } from 'desktop/modules/space/tabs/note/hooks/useSaveNoteTabQueryKey';

import { entityApi } from '../entityApi';
import { queryClient } from '../queryClient';

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

  React.useEffect(() => {
    const invalidate = debounce(() => {
      queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 2) });
    }, 500);

    noteEmitter.on(noteEvents.foundDeletedPost, invalidate);

    return () => {
      noteEmitter.removeListener(noteEvents.foundDeletedPost, invalidate);
    };
  }, [queryKey]);

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
