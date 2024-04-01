import React from 'react';

import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { openTab } from 'shared/actions/space/openTab';
import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostBase } from 'shared/components/Post';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: IdentityType,
}

export const Post = React.memo(({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.noteId));

  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');

  const { mutate: unstick } = useUnstickPost(postId);

  if (post._isDeleted) {
    return null;
  }

  return (
    <Menu isContextMenu>
      <MenuTrigger as={Box}>
        <Link
          to={buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note.id } })}
          onClick={(e) => {
            if (e.metaKey) {
              e.preventDefault();
              dispatch(openTab({ 
                route: buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note.id } }),
              }));
            }
          }}
        >
          <PostBase
            noteId={note.id}
            postId={postId}
          />
        </Link>
      </MenuTrigger>
      <MenuList>
        <MenuItem onClick={() => unstick()}>
          Unstick
        </MenuItem>
      </MenuList>
    </Menu>
    
  );
});
