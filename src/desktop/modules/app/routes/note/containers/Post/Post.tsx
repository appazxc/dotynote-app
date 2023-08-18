import { Box } from '@chakra-ui/react';
import { appRouteNames } from 'desktop/modules/app/constants/appRouteNames';
import { getAppUrl } from 'desktop/modules/app/helpers/getAppUrl';
import React from 'react';
import { Link } from 'react-router-dom';
import { noteSelector, postSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  postId: string,
  className: string,
}

export const Post = React.memo(({ postId, className }: Props) => {
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.id));

  return (
    <Link to={getAppUrl(appRouteNames.note, { noteId: note?.id})}>
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
    
  );
});
