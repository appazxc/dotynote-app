import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { useInfinityPosts } from 'shared/api/hooks/useInfinityPosts';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { Post } from '../Post';

import { PostsSkeleton } from './Posts.skeleton';

const ROOT_MARGIN = '400px';

type Props = {
  noteId: IdentityType,
  onPostClick?: (e: React.MouseEvent<HTMLDivElement>) => (noteId: IdentityType) => void,
}

export const Posts = ({ noteId, onPostClick }: Props) => {
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
    return {};
  }, []);

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

  const flatData = React.useMemo(() => ((data?.pages?.slice(0).reverse() || []).flat()), [data]);

  const showNextPageObserver = !isFetching && hasNextPage;
  const showPreviousPageObserver = !isFetching && hasPreviousPage;

  return (
    <>
      <Box pb="10" flexGrow={data ? '1' : '0'}>
        {isFetchingFirstTime && <PostsSkeleton />}
        <Stack gap="2">
          {showNextPageObserver && <Box ref={nextRef} />}
          {isFetchingNextPage && <PostsSkeleton />}
          {
            flatData.map((postId) => (
              <Post
                key={postId}
                postId={postId} 
                onClick={onPostClick}
              />
            ))
          }
          {isFetchingPreviousPage && <PostsSkeleton />}
          {showPreviousPageObserver && <Box ref={prevRef} />}
        </Stack>
      </Box>
      <TabScrollRestoration />
    </>
  );
};
