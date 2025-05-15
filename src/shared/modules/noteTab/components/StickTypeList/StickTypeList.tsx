import { Box, BoxProps, Stack } from '@chakra-ui/react';
import { isBoolean } from 'lodash';
import React from 'react';

import {
  InfinityNoteFilters,
  InfinityQueryOptions,
  useInfinityNoteList,
} from 'shared/api/hooks/useInfinityNoteList';
import { EMPTY_ARRAY, EMPTY_OBJECT } from 'shared/constants/common';
import { DEFAULT_PAGE_SIZE, SORT } from 'shared/constants/requests';
import { getIsSelected } from 'shared/modules/noteTab/components/StickTypeList/helpers/getIsSelected';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { PostOrderBy, Sort } from 'shared/types/common';

import { PostItem } from '../PostItem';
import { PostsLoader } from '../PostsLoader';

type Props = {
  noteId: string;
  search?: string;
  sort?: Sort;
  orderBy?: PostOrderBy;
  isSelecting?: boolean;
  hasOverlay?: boolean;
  pageSize?: number;
  isPinned?: boolean;
  selectedPosts?: string[];
  options?: InfinityQueryOptions;
  internalLevel?: number;
  disablePagination?: boolean;
  scrollRestoration?: boolean;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement>) => (id: string) => void;
  onScrollRestoration?: () => void;
} & BoxProps

export const getInfinityStickTypeQueryKey = (noteId: string = '', filters: InfinityNoteFilters = {}) => 
  ['posts', noteId, 'stick-notes', filters] as const;

export type InfinityStickTypeQueryKey = ReturnType<typeof getInfinityStickTypeQueryKey>;

export const StickTypeList = React.memo((props: Props) => {
  const {
    noteId,
    search,
    isPinned,
    internalLevel = 0,
    isSelecting = false,
    hasOverlay = false,
    scrollRestoration = true,
    selectedPosts = EMPTY_ARRAY,
    sort = SORT.DESC,
    pageSize = DEFAULT_PAGE_SIZE,
    orderBy = 'position',
    options = EMPTY_OBJECT,
    disablePagination,
    onScrollRestoration,
    onOverlayClick,
    ...boxProps
  } = props;

  const filters = React.useMemo(() => {
    const result: Record<string, string | number> = {
      parentId: noteId,
    };

    if (search) {
      result.query = search;
    }

    if (isBoolean(isPinned)) {
      result.isPinned = String(isPinned);
    }

    if (pageSize) {
      result.pageSize = pageSize;
    }

    if (sort) {
      result.sort = sort;
    }

    if (typeof orderBy !== 'undefined') {
      result.orderBy = orderBy;
    }
    
    return result;
  }, [search, sort, orderBy, pageSize, isPinned, noteId]);

  const { 
    data,
    flatData, 
    isFetchingFirstTime,
    prevPageObserver,
    nextPageObserver,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfinityNoteList({
    noteId,
    path: '/posts',
    filters,
    options: {
      ...options,
      disablePagination,
    },
    getQueryKey: getInfinityStickTypeQueryKey,
  });

  return (
    <>
      <Box
        flexGrow={data ? '1' : '0'}
        {...boxProps}
      >
        {isFetchingFirstTime && <PostsLoader />}
        <Stack gap="4">
          {nextPageObserver}
          {isFetchingNextPage && <PostsLoader />}
          {
            flatData.map((postId) => (
              <PostItem
                key={postId}
                internalLevel={internalLevel}
                isSelecting={isSelecting}
                isSelected={getIsSelected(postId, isSelecting, selectedPosts)}
                hasOverlay={hasOverlay}
                postId={postId}
                onOverlayClick={onOverlayClick} 
              />
            ))
          }
          {isFetchingPreviousPage && <PostsLoader />}
          {prevPageObserver}
        </Stack>
      </Box>

      {scrollRestoration && <TabScrollRestoration onScrollRestoration={onScrollRestoration} />}
    </>
  );
});
