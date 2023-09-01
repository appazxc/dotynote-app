import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import api from 'shared/api';
import { useIntersectionObserver } from 'usehooks-ts';
import { Post } from '../Post';
import { Stack } from '@chakra-ui/react';
import { useScrollContext } from 'shared/components/ScrollProvider';
import throttle from 'lodash/throttle';
import { loadMoreDirection, PAGE_SIZE } from 'shared/constants/requests';

const VISIBLE_POSTS_LENGTH = 20;
const ROOT_MARGIN = '200px';

export const Posts = ({ noteId, postId }) => {
  const postsId = React.useId();
  const scrollRef = useScrollContext();
  const prevTriggerRef = React.useRef<HTMLDivElement>(null);
  const nextTriggerRef = React.useRef<HTMLDivElement>(null);
  const prevObserver = useIntersectionObserver(prevTriggerRef, {
    root: scrollRef?.current,
    rootMargin: ROOT_MARGIN,
  });
  const nextObserver = useIntersectionObserver(nextTriggerRef, {
    root: scrollRef?.current,
    rootMargin: ROOT_MARGIN,
  });
  const isVisiblePrev = !!prevObserver?.isIntersecting;
  const isVisibleNext = !!nextObserver?.isIntersecting;
  const [middlePostId, setMiddlePostId] = React.useState<string | null>(postId);

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
    isFetched,
  } = useInfiniteQuery({
    queryKey: ['posts', noteId, postId],
    queryFn: async ({ pageParam, queryKey }) => {
      const [,, middleId] = queryKey;
      
      const { cursor, direction } = pageParam || {};

      const res = await api.loadPosts(
        noteId, 
        { 
          cursor: cursor || middleId, 
          direction: direction || (middleId && loadMoreDirection.AROUND) 
        }
      );
      
      return  res;
    },
    getPreviousPageParam: (page) => page.length === PAGE_SIZE && postId
      ? { cursor: page[0], direction: loadMoreDirection.PREVIOUS } 
      : undefined,
    getNextPageParam: (page) => {
      return page.length === PAGE_SIZE 
        ? { cursor: page[page.length - 1], direction: loadMoreDirection.NEXT } 
        : undefined;
    },
    staleTime: Infinity,
  });

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
    if (isVisiblePrev && hasPreviousPage) {
      fetchPreviousPage();
    }
  }, [isVisiblePrev]);

  React.useEffect(() => {
    if (isVisibleNext && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisibleNext]);

  React.useEffect(() => {
    if (isFetched && postId) {
      const post = Array
        .from(document.getElementsByClassName(postsId))
        .find(element => { 
          if (!(element instanceof HTMLElement)) return false;
          return element.dataset.postId === postId;
        });

      if (post) {
        console.log('scroll');
        
        post.scrollIntoView(({ block: "center" }));
      }
    }
  }, [isFetched]);

  // console.log(
  //   'console',
  //   visiblePosts,
  //   flatData,
  //   data,
  //   status,
  //   error,
  //   isFetching,
  //   isFetchingNextPage,
  // isFetchingPreviousPage,
  //   hasPreviousPage,
  //   hasNextPage,
  // );
  
  return (
    <div>
      <Stack gap="2">
        <div ref={prevTriggerRef} />
        {
          visiblePosts.map((postId) => (
            <Post
              key={postId}
              postId={postId} 
              className={postsId}
            />
          ))
        }
        <div ref={nextTriggerRef} />
      </Stack>
      
    </div>
  );
};
