import React from 'react';

import { Box } from '@chakra-ui/react';

import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostBase } from 'shared/components/Post';
import { noteEmitter, noteEvents } from 'shared/modules/space/tabRoutes/note/util/noteEmitter';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => (postId: string) => void
}

export const Post = React.memo(({ postId, onClick }: Props) => {
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.noteId));
  
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
        <PostBase
          noteId={note.id}
          postId={postId}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            onClick?.(e)(note.id);
          }}
        />
      </MenuTrigger>
      <MenuList>
        <MenuItem onClick={() => unstick()}>
          Unstick
        </MenuItem>
      </MenuList>
    </Menu>
    
  );
});
