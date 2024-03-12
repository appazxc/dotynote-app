import React from 'react';

import { Box, Stack } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import throttle from 'lodash/throttle';
import { useIntersectionObserver } from 'usehooks-ts';

import api from 'shared/api';
import { usePosts } from 'shared/api/hooks/usePosts';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { loadMoreDirection, PAGE_SIZE } from 'shared/constants/requests';

import { Post } from '../Post';

export const Posts = ({ noteId, postId }) => {
  const postsId = React.useId();
  const { data } = usePosts(noteId, {});
 
  return (
    <Box pb="10" flexGrow={data ? '1' : '0'}>
      <Stack gap="2">
        {
          data?.map((postId) => (
            <Post
              key={postId}
              postId={postId} 
              className={postsId}
            />
          ))
        }
      </Stack>
    </Box>
  );
};
