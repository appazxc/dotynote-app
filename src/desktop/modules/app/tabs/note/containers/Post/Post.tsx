import { Box } from '@chakra-ui/react';
import { tabNames } from 'desktop/modules/app/constants/tabNames';
import { getTabUrl } from 'desktop/modules/app/helpers/getTabUrl';
import React from 'react';
import { Link } from 'react-router-dom';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  postId: string,
  className: string,
}

export const Post = React.memo(({ postId, className }: Props) => {
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.id));

  return (
    <Box>
      <Link to={getTabUrl(tabNames.note, { noteId: note?.id }, { postId })}>to Post #{postId}</Link>
      <Link to={getTabUrl(tabNames.note, { noteId: note?.id })}>
        <Box
          className={className}
          h="80px"
          p="4"
          borderWidth='2px'
          borderRadius='lg'
          borderColor="slateDark.7"
          cursor="pointer"
          data-post-id={postId}
        >
          {note?.title}
        </Box>
      </Link>
    </Box>
  );
});
