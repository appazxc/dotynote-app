import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { useInfinityPosts } from 'shared/api/hooks/useInfinityPosts';
import { useScrollContext } from 'shared/components/ScrollProvider';

import { Post } from '../Post';

import { PostsSkeleton } from './Posts.skeleton';

const ROOT_MARGIN = '400px';

export const Posts = ({ noteId, postId }) => {
  const postsId = React.useId();
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
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    fetchNextPage,
    ...rest
  } = useInfinityPosts(noteId, filters);

  const isFetchingFirstTime = isFetching && !isFetchingNextPage && !isFetchingPreviousPage;

  React.useEffect(() => {
    if (inViewPrev) {
      fetchPreviousPage();
    }
  }, [fetchPreviousPage, inViewPrev]);

  React.useEffect(() => {
    if (inViewNext) {
      fetchNextPage();
    }
  }, [fetchNextPage, inViewNext]);

  const flatData = React.useMemo(() => ((data?.pages?.slice(0).reverse() || []).flat()), [data]);

  return (
    <Box pb="10" flexGrow={data ? '1' : '0'}>
      {isFetchingFirstTime && <PostsSkeleton />}
      <Stack gap="2">
        {isFetchingNextPage ? <PostsSkeleton /> : <Box ref={nextRef} />}
        {
          flatData.map((postId) => (
            <Post
              key={postId}
              postId={postId} 
              className={postsId}
            />
          ))
        }
        {isFetchingPreviousPage ? <PostsSkeleton /> : <Box ref={prevRef} />}
      </Stack>
    </Box>
  );
};
