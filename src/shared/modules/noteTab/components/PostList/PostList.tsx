import { Box, BoxProps, Stack } from '@chakra-ui/react';
import { isBoolean } from 'lodash';
import debounce from 'lodash/debounce';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { getInfinityPostsQueryKey, InfinityPostsOptions, useInfinityPosts } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { EMPTY_ARRAY, EMPTY_OBJECT } from 'shared/constants/common';
import { DEFAULT_PAGE_SIZE, SORT, Sort } from 'shared/constants/requests';
import { SORT_ORDER_IDS } from 'shared/constants/sortOrders';
import { getIsSelected } from 'shared/modules/noteTab/components/PostList/helpers/getIsSelected';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { PostEntity } from 'shared/types/entities/PostEntity';

import { Post } from '../Post';

import { PostsSkeleton } from './PostsList.skeleton';

const ROOT_MARGIN = '400px';

type Props = {
  noteId: number,
  onPostClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void,
  scrollRestoration?: boolean,
  search?: string,
  sort?: Sort,
  orderBy?: number,
  isSelecting?: boolean,
  pageSize?: number,
  isPinned?: boolean,
  pinnedOnTop?: boolean,
  selectedPosts?: number[],
  options?: InfinityPostsOptions,
  internalLevel?: number,
} & BoxProps

export const PostList = React.memo((props: Props) => {
  const {
    noteId,
    onPostClick,
    search,
    isPinned,
    internalLevel = 0,
    isSelecting = false,
    scrollRestoration = true,
    selectedPosts = EMPTY_ARRAY,
    sort = SORT.DESC,
    pageSize = DEFAULT_PAGE_SIZE,
    orderBy = SORT_ORDER_IDS.POSITION,
    options = EMPTY_OBJECT,
    pinnedOnTop,
    ...boxProps
  } = props;
  const scrollRef = useScrollContext();
  const [ nextRef, inViewNext ] = useInView({
    rootMargin: ROOT_MARGIN,
    root: scrollRef?.current,
  });
  const [ prevRef, inViewPrev ] = useInView({
    rootMargin: ROOT_MARGIN,
    root: scrollRef?.current,
  });

  const filters = React.useMemo(() => {
    const result: Record<string, string | number> = {};

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

    if (isBoolean(pinnedOnTop)) {
      result.pinnedOnTop = String(pinnedOnTop);
    }

    if (typeof orderBy !== 'undefined') {
      result.orderBy = orderBy;
    }
    
    return result;
  }, [search, sort, orderBy, pageSize, isPinned, pinnedOnTop]);

  const { 
    data, 
    isFetching,
    isFetched,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfinityPosts(noteId, filters, options);

  const isFetchingFirstTime = isFetching && !isFetched;

  React.useEffect(() => {
    if (inViewPrev && hasPreviousPage) {      
      fetchPreviousPage();
    }
  }, [fetchPreviousPage, inViewPrev, hasPreviousPage]);

  React.useEffect(() => {
    if (inViewNext && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inViewNext, hasNextPage]);

  const handleOnPostDelete = React.useMemo(() => debounce(() => {
    queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(noteId, filters) });
  }, 100), [noteId, filters]);
  
  const flatData = React.useMemo(() => ((data?.pages?.slice(0).reverse() || []).flat()), [data]);

  const showNextPageObserver = !isFetching && hasNextPage;
  const showPreviousPageObserver = !isFetching && hasPreviousPage;

  const isFullyLoaded = !(hasNextPage && hasPreviousPage);

  if (!isFetchingFirstTime && isFullyLoaded && !flatData.length) {
    return null;
  }

  return (
    <>
      <Box
        pb="20"
        flexGrow={data ? '1' : '0'}
        {...boxProps}
      >
        {isFetchingFirstTime && <PostsSkeleton />}
        <Stack gap="4">
          {showNextPageObserver && <Box ref={nextRef} />}
          {isFetchingNextPage && <PostsSkeleton />}
          {
            flatData.map((postId) => (
              <Post
                key={postId}
                internalLevel={internalLevel}
                isSelecting={isSelecting}
                isSelected={getIsSelected(postId, isSelecting, selectedPosts)}
                postId={postId} 
                onClick={onPostClick}
                onDelete={handleOnPostDelete}
              />
            ))
          }
          {isFetchingPreviousPage && <PostsSkeleton />}
          {showPreviousPageObserver && <Box ref={prevRef} />}
        </Stack>
      </Box>
      {scrollRestoration && <TabScrollRestoration />}
    </>
  );
});
