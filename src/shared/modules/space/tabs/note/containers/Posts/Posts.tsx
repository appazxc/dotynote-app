import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { useInfinityPosts } from 'shared/api/hooks/useInfinityPosts';

import { Post } from '../Post';

export const Posts = ({ noteId, postId }) => {
  const postsId = React.useId();
  const { ref, inView } = useInView();

  const { 
    data, 
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchPreviousPage,
    ...rest
  } = useInfinityPosts(noteId, {});
  console.log('rest', data, rest);
  // console.log('inView', inView);

  // const isFetchingFirstTime = isFetching && !isFetchingNextPage && !isFetchingPreviousPage;

  React.useEffect(() => {
    if (inView) {
      fetchPreviousPage();
    }
  }, [fetchPreviousPage, inView]);

  const flatData = React.useMemo(() => ((data?.pages?.slice(0).reverse() || []).flat()), [data]);

  return (
    <Box pb="10" flexGrow={data ? '1' : '0'}>
      <Stack gap="2">
        {
          flatData.map((postId) => (
            <Post
              key={postId}
              postId={postId} 
              className={postsId}
            />
          ))
        }
        <Box ref={ref}>in view {String(inView)} isFetching {String(isFetching)}</Box>
      </Stack>
    </Box>
  );
};
