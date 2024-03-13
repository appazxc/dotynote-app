import { useInfiniteQuery } from '@tanstack/react-query';

import { LoadListFilters } from 'shared/api/options/posts';
import { LoadMoreDirection, PAGE_SIZE, loadMoreDirection } from 'shared/constants/requests';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { getCursorName } from 'shared/util/api/getCursorName';

import { entityApi } from '../entityApi';

type Filters = Omit<LoadListFilters, 'parentId'>;

type PageParam = { 
  cursor?: IdentityType | null,
  direction?: LoadMoreDirection | null, 
}

const initialPageParam: PageParam = 
// {
//   cursor: null,
//   direction: null,
// }; 
{
  cursor: 100,
  direction: loadMoreDirection.AROUND,
};

export const useInfinityPosts = (noteId: IdentityType, filters: Filters = {}) => {
  return useInfiniteQuery({
    queryKey: ['posts', noteId, filters],
    queryFn: async ({ pageParam, queryKey }) => {
      const { cursor, direction } = pageParam;

      const apiFilters = {
        parentId: noteId,
        pageSize: PAGE_SIZE,
        ...filters,
      };
      console.log('query cursor', pageParam);

      if (cursor && direction) {
        apiFilters[getCursorName(direction)] = cursor;
      }

      return entityApi.post.loadList({ filters: apiFilters });
    },
    getPreviousPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPage.length === PAGE_SIZE 
        ? { cursor: lastPage[lastPage.length - 1], direction: loadMoreDirection.PREVIOUS } 
        : null;
    },
    getNextPageParam: (firstPage, allPages, firstPageParam, allPageParams) => {
      return firstPage.length === PAGE_SIZE && firstPageParam.cursor
        ? { cursor: firstPage[0], direction: loadMoreDirection.NEXT } 
        : null;
    },
    initialPageParam,
  });
};
