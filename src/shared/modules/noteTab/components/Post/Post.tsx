import React from 'react';

import { Box } from '@chakra-ui/react';

import { useDeleteNote } from 'shared/api/hooks/useDeleteNote';
import { useUnstickPost } from 'shared/api/hooks/useUnstickPost';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { NoteInPost } from 'shared/components/NoteInPost';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startMoveOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { ApiPostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: string,
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: ApiPostEntity) => void,
  onDelete: () => void,
}

export const Post = React.memo(({ postId, onClick, onDelete }: Props) => {
  const getByIdPost = React.useMemo(() => postSelector.makeGetById(), []);
  const getByIdNote = React.useMemo(() => noteSelector.makeGetById(), []);
  const post = useAppSelector(state => getByIdPost(state, postId));
  const note = useAppSelector(state => getByIdNote(state, post?.note));
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
          <NoteInPost
            noteId={note.id}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              onClick?.(event)(post);
            }}
          />
        </MenuTrigger>
        <MenuList>
          {post.permissions.stick && (
            <MenuItem
              label="Stick"
              onClick={() => dispatch(startStickOperation({
                fromNoteId: post.parent,
                noteIds: [note.id],
              }))}
            />
          )}
          {post.permissions.unstick && (
            <MenuItem label="Unstick" onClick={() => unstick()} />
          )}
          {post.permissions.move && (
            <MenuItem
              label="Move"
              onClick={() => dispatch(startMoveOperation({
                fromNoteId: post.parent,
                postIds: [post.id],
              }))}
            />
          )}
          {post.permissions.delete && (
            <>
              <MenuDivider />
              <MenuItem 
                colorScheme="red"
                label="Delete"
                onClick={() => { dispatch(showModal({ id: modalIds.confirm, extraId: deleteNoteExtraId })); }}
              />
            </>
          )}
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
