import React from 'react';

import { Box } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostBase } from 'shared/components/Post';
import { buildTabHref } from 'shared/modules/space/helpers/buildTabHref';
import { noteEmitter, noteEvents } from 'shared/modules/space/tabs/note/util/noteEmitter';
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
  const navigate = useNavigate();
  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');
  const { mutate: unstick } = useUnstickPost(postId);
  React.useEffect(() => {
    if (post._isDeleted) {
      noteEmitter.emit(noteEvents.foundDeletedPost);
    }
  }, [post._isDeleted]);
      
  if (post._isDeleted) {
    return null;
  }
        
  return (
    <Menu isContextMenu>
      <MenuTrigger as={Box}>
        <Box
          onClick={(e) => {
            e.preventDefault();
            if (e.metaKey) {
              dispatch(openTab({ 
                route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(note.id) } }),
              }));
            } else {
              navigate({ to: '/n/$noteId', params: { noteId: note.id } });
            }
          }}
        >
          <PostBase
            noteId={note.id}
            postId={postId}
          />
        </Box>
      </MenuTrigger>
      <MenuList>
        <MenuItem onClick={() => unstick()}>
          Unstick
        </MenuItem>
      </MenuList>
    </Menu>
    
  );
});
