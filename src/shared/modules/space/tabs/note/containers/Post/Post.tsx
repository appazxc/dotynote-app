import React from 'react';

import { Box } from '@chakra-ui/react';
import { useNavigate, useRouter } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostBase } from 'shared/components/Post';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { noteEmitter, noteEvents } from 'shared/modules/space/tabs/note/util/noteEmitter';
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
  const navigate = useNavigate();
  const router = useRouter();
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
        
  console.log('router', router, router.buildLocation({ to: '/n/$noteId', params: { noteId: note.id } }));
  return (
    <Menu isContextMenu>
      <MenuTrigger as={Box}>
        <Box
          onClick={(e) => {
            e.preventDefault();
            if (e.metaKey) {
              dispatch(openTab({ 
                route: buildTabUrl({ routeName: tabRouteNames.note, pathParams: { noteId: note.id } }),
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
