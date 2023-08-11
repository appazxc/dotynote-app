import { Box } from '@chakra-ui/react';
import React from 'react';
import { noteSelector, postSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';

export const Post = React.memo(({ id }) => {
  const post = useAppSelector(state => postSelector.getById(state, id));
  const note = useAppSelector(state => noteSelector.getById(state, post?.id));
  console.log('here', id);

  return (
    <Box
      h="80px"
      p="4"
      borderWidth='2px'
      borderRadius='lg'
      borderColor="slateDark.7"
    >
      {note?.title}
    </Box>
  );
});
