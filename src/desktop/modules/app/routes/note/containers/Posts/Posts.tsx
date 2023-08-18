import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import api from 'shared/api';
import { useIntersectionObserver } from 'usehooks-ts';
import { Post } from '../Post';
import { Stack } from '@chakra-ui/react';
import { useScrollContext } from 'shared/components/ScrollProvider';
import throttle from 'lodash/throttle';

const PAGE_SIZE = 5;
const VISIBLE_POSTS_LENGTH = 20;

export const Posts = ({ noteId }) => {
  const postsId = React.useId();
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const scrollRef = useScrollContext();
  const entry = useIntersectionObserver(ref, {
    root: scrollRef?.current,
    rootMargin: '100px',
  });
  const [middlePostId, setMiddlePostId] = React.useState<string | null>(null);
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
      const { cursor, direction } = pageParam || {};

      const res = await api.loadPosts(noteId, { cursor });
      
      return  res;
    },
    {
      getPreviousPageParam: (page) => page.length === PAGE_SIZE 
        ? { cursor: page[0], direction: 'prev' } 
        : undefined,
      getNextPageParam: (page) => page.length === PAGE_SIZE 
        ? { cursor: page[page.length - 1], direction: 'next' } 
        : undefined,
    },
  );

  const flatData = React.useMemo(() => ((data?.pages || []).flat()), [data]);

  const visiblePosts = React.useMemo(() => {
    if (!middlePostId) {
      return flatData;
    }

    const middleIndex = flatData.indexOf(middlePostId);
    const startIndex = Math.max(0 , middleIndex - Math.floor(VISIBLE_POSTS_LENGTH / 2));
    const endIndex = startIndex + VISIBLE_POSTS_LENGTH;

    return endIndex > flatData.length 
      ? flatData.slice(-VISIBLE_POSTS_LENGTH) 
      : flatData.slice(startIndex, endIndex);
  }, [middlePostId, flatData]);

  React.useEffect(() => {
    const handleScroll = throttle(() => {
      if (!scrollRef?.current) return;

      const { bottom, top } = scrollRef.current.getBoundingClientRect();
      const middleTop = top + (bottom - top) / 2;

      let nearestId: string | null = null;
      let nearestValue = Infinity;

      Array.from(document.getElementsByClassName(postsId)).forEach((element) => {
        if (!(element instanceof HTMLElement)) return;

        const { top, height } = element.getBoundingClientRect();
        const { postId = null } = element.dataset; 
        const postMiddleTop = top + height / 2;
        const distance = Math.abs(middleTop - postMiddleTop);

        if (distance < nearestValue) {
          nearestId = postId;
          nearestValue = distance;
        }
      });

      if (nearestId !== middlePostId) {
        setMiddlePostId(nearestId);
      }
    }, 100);

    scrollRef?.current?.addEventListener('scroll', handleScroll);

    return () => {
      scrollRef?.current?.removeEventListener('scroll', handleScroll);
    };
  }, [scrollRef, visiblePosts, middlePostId]);

  React.useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible]);

  // console.log(
  //   data,
  //   status,
  //   error,
  //   isFetching,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   // fetchNextPage,
  //   // fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  // );
  
  return (
    <div>
      <Stack gap="2">
        {
          visiblePosts.map((postId) => (
            <Post
              key={postId}
              postId={postId} 
              className={postsId}
            />
          ))
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
