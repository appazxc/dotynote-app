import { Box } from '@chakra-ui/react';
import React from 'react';
import { noteSelector, postSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';

export const Post = React.memo(({ postId, className }) => {
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.id));
console.log('postId', postId);

  return (
    <Box
      className={className}
      h="80px"
      p="4"
      borderWidth='2px'
      borderRadius='lg'
      borderColor="slateDark.7"
      data-post-id={postId}
    >
      {note?.title}
    </Box>
  );
});
