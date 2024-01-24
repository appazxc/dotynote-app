import React from 'react';

import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { createTab } from 'shared/actions/space/createTab';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string,
  className: string,
}

export const Post = React.memo(({ postId, className }: Props) => {
  const dispatch = useAppDispatch();
  const spaceId = useAppSelector(selectActiveSpaceId);
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.id));

  invariant(spaceId, 'Missing spaceId');

  return (
    <Box>
      <Link
        to={buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note?.id } })}
        onClick={(e) => {
          if (e.metaKey) {
            e.preventDefault();
            dispatch(createTab({ 
              route: buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note?.id } }),
            }));
          }
        }}
      >
        <Box
          className={className}
          h="80px"
          p="4"
          borderWidth="2px"
          borderRadius="lg"
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
