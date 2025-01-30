import { Box, BoxProps, Stack } from '@chakra-ui/react';
import { isBoolean } from 'lodash';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import {
  getInfinityPostsQueryKey,
  InfinityPostsOptions,
  PageParam,
  QueryFnData,
  useInfinityPosts,
} from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { EMPTY_ARRAY, EMPTY_OBJECT } from 'shared/constants/common';
import { ORDER_BY_IDS } from 'shared/constants/orderByIds';
import { DEFAULT_PAGE_SIZE, SORT, Sort } from 'shared/constants/requests';
import { getIsSelected } from 'shared/modules/noteTab/components/PostList/helpers/getIsSelected';
import { TabScrollRestoration } from 'shared/modules/space/components/TabScrollRestoration';
import { PostEntity } from 'shared/types/entities/PostEntity';

import { Post } from '../Post';

import { PostsLoader } from './PostsListLoader';

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
  disablePagination?: boolean,
  onScrollRestoration?: () => void,
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
    orderBy = ORDER_BY_IDS.POSITION,
    options = EMPTY_OBJECT,
    pinnedOnTop,
    disablePagination,
    onScrollRestoration,
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
  
  const handleOnPostDelete = React.useCallback((postId: number) => {
    queryClient.setQueryData<{
      pageParams: PageParam[],
      pages: QueryFnData[],
    }>(getInfinityPostsQueryKey(noteId, filters), (oldData) => {
      if (!oldData) {
        return oldData;
      }

      const filteredPages = oldData.pages.map((page) => ({
        ...page,
        items: page.items.filter((id) => id !== postId),
      }));

      const restorePagesStructure = (pages: QueryFnData[], pageSize: number) => {
        const length = pages.length;

        if (length <= 1) {
          return pages;
        }

        const result: QueryFnData[] = [];

        for (let i = 0; i < length; i++) {
          const data = pages[i];
          const { items, ...restDataProps } = data;
          const lastData = result[result.length - 1];

          if (!lastData || lastData.items.length === pageSize) {
            result.push(data);
            continue;
          }

          const lastDataLength = lastData.items.length;
          const dataLength = items.length;

          if (lastDataLength + dataLength <= pageSize) { 
            result[result.length - 1] = {
              items: [...items, ...lastData.items],
              ...restDataProps,
            };
            continue;
          }

          const lengthToFill = pageSize - lastDataLength;

          lastData.items = [...items.slice(-lengthToFill), ...lastData.items];

          result.push({
            ...restDataProps,
            items: items.slice(0, items.length - lengthToFill),
          });
        }

        return result;
      };
      
      return {
        ...oldData,
        pages: restorePagesStructure(filteredPages, pageSize),
      };
    });
  }, [noteId, filters, pageSize]);

  const flatData = React.useMemo(() => ((data?.pages?.map(({ items }) => items).reverse() || []).flat()), [data]);

  const showNextPageObserver = !isFetching && hasNextPage && !disablePagination;
  const showPreviousPageObserver = !isFetching && hasPreviousPage && !disablePagination;

  // const isFullyLoaded = !(hasNextPage && hasPreviousPage);

  // if (!isFetchingFirstTime && isFullyLoaded && !flatData.length) {
  //   return null;
  // }

  return (
    <>
      <LayoutGroup>
        <AnimatePresence initial={false}>
          <Box
            pb="20"
            flexGrow={data ? '1' : '0'}
            {...boxProps}
          >
            {isFetchingFirstTime && <PostsLoader />}
            <Stack gap="4">
              {showNextPageObserver && <Box ref={nextRef} />}
              {isFetchingNextPage && <PostsLoader />}
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
              {isFetchingPreviousPage && <PostsLoader />}
              {showPreviousPageObserver && <Box ref={prevRef} />}
            </Stack>
          </Box>
        </AnimatePresence>
      </LayoutGroup>

      {scrollRestoration && <TabScrollRestoration onScrollRestoration={onScrollRestoration} />}
    </>
  );
});
