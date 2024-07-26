import React from 'react';

import { Box } from '@chakra-ui/react';

import { useDeleteNote } from 'shared/api/hooks/useDeleteNote';
import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostBase } from 'shared/components/Post';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { showModal, hideModal } from 'shared/modules/modal/modalSlice';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string,
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => (postId: string) => void,
  onDelete: () => void,
}

export const Post = React.memo(({ postId, onClick, onDelete }: Props) => {
  const post = useAppSelector(state => postSelector.getById(state, postId));
  const note = useAppSelector(state => noteSelector.getById(state, post?.noteId));
  const dispatch = useAppDispatch();
  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');

  const { mutate: unstick } = useUnstickPost(postId);
  const { mutate: deleteNote } = useDeleteNote(note.id);

  React.useEffect(() => {
    if ((post._isDeleted || note._isDeleted) && onDelete) {
      onDelete();
    }
  }, [post._isDeleted, note._isDeleted, onDelete]);
      
  if (post._isDeleted) {
    return null;
  }
        
  const deleteNoteExtraId = `deleteNote${note.id}`;
  return (
    <>
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
          <MenuDivider />
          <MenuItem 
            colorScheme="red"
            onClick={() => { dispatch(showModal({ id: modalIds.confirm, extraId: deleteNoteExtraId })); }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <ConfirmModal
        title="This action can't be undone"
        description="Delete selected note?"
        confirmText="Delete"
        extraId={deleteNoteExtraId}
        onConfirm={() => {
          dispatch(hideModal());
          deleteNote();
        }}
      />
    </>
  );
});
