import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useInView } from 'react-intersection-observer';

import { getInfinityPostsQueryKey, useInfinityPosts } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { SORT_ORDER_IDS } from 'shared/constants/sortOrders';
import { getIsSelected } from 'shared/modules/noteTab/components/PostList/helpers/getIsSelected';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { ApiPostEntity } from 'shared/types/entities/PostEntity';

import { Post } from '../Post';

import { PostsSkeleton } from './PostsList.skeleton';

const ROOT_MARGIN = '400px';

type Props = {
  noteId?: number,
  onPostClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: ApiPostEntity) => void,
  scrollRestoration?: boolean,
  search: string,
  sort?: 'desc' | 'asc',
  orderBy?: number,
  isSelecting?: boolean,
  selectedPosts?: number[],
}

export const PostList = React.memo((props: Props) => {
  const {
    noteId,
    onPostClick,
    search,
    isSelecting = false,
    scrollRestoration = true,
    selectedPosts = EMPTY_ARRAY,
    sort = 'desc',
    orderBy = SORT_ORDER_IDS.POSITION, 
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

    if (sort) {
      result.sort = sort;
    }

    if (typeof orderBy !== 'undefined') {
      result.orderBy = orderBy;
    }
    
    return result;
  }, [search, sort, orderBy]);

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
    // ...rest
  } = useInfinityPosts(noteId, filters);
  // console.log('data', data);
  // console.log('rest', rest);

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

  return (
    <>
      <Box pb="20" flexGrow={data ? '1' : '0'}>
        {isFetchingFirstTime && <PostsSkeleton />}
        <Stack gap="2">
          {showNextPageObserver && <Box ref={nextRef} />}
          {isFetchingNextPage && <PostsSkeleton />}
          {
            flatData.map((postId) => (
              <Post
                key={postId}
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
