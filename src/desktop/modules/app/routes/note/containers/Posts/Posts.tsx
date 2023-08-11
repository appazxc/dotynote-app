import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import api from 'shared/api';
import { useIntersectionObserver } from 'usehooks-ts';
import { Post } from '../Post';
import { Stack } from '@chakra-ui/react';

const PAGE_SIZE = 5;

export const Posts = ({ noteId }) => {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['posts'],
    async ({ pageParam }) => {
      console.log('pageParam', pageParam);
      const res = await api.loadPosts(noteId, { cursor: pageParam });
      console.log('res', res);
      
      return  res;
    },
    {
      getPreviousPageParam: (page) => page.length === PAGE_SIZE ? page[0] : undefined,
      getNextPageParam: (page) => page.length === PAGE_SIZE ? page[page.length - 1] : undefined,
    },
  );

  React.useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  console.log(
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    // fetchNextPage,
    // fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  );
  
  return (
    <div>
      <Stack gap="2">
        {
          data?.pages.map(page => page.map((postId) => <Post key={postId} id={postId} />))
        }
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load Newer'
              : 'Nothing more to load'}
        </button>
      </Stack>
      
    </div>
  );
};
