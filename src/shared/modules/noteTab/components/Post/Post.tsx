import React from 'react';


import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { usePinPost } from 'shared/api/hooks/usePinPost';
import { useRemovePosts } from 'shared/api/hooks/useRemovePosts';
import { useUnpinPost } from 'shared/api/hooks/useUnpinPost';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Post as PostComponent } from 'shared/components/Post';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startMoveOperation, startSelectOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { ApiPostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: ApiPostEntity) => void,
  onDelete: () => void,
}

export const Post = React.memo((props: Props) => {
  const { postId, onClick, onDelete, isSelecting, isSelected } = props;
  const getByIdPost = React.useMemo(() => postSelector.makeGetById(), []);
  const getByIdNote = React.useMemo(() => noteSelector.makeGetById(), []);
  const post = useAppSelector(state => getByIdPost(state, postId));
  const note = useAppSelector(state => getByIdNote(state, post?.note));
  const dispatch = useAppDispatch();

  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');

  const { mutate: remove } = useRemovePosts(postId);
  const { mutate: deleteNote } = useDeleteNotes(note.id);
  const { mutate: pin } = usePinPost();
  const { mutate: unpin } = useUnpinPost();

  React.useEffect(() => {
    if ((post._isDeleted || note._isDeleted) && onDelete) {
      onDelete();
    }
  }, [post._isDeleted, note._isDeleted, onDelete]);
      
  const renderedPost = React.useMemo(() => {
    if (post._isDeleted) {
      return null;
    }

    return (
      <PostComponent
        isSelecting={isSelecting}
        isSelected={isSelected}
        isPinned={!!post.pinnedAt}
        noteId={note.id}
        onClick={(event: React.MouseEvent<HTMLDivElement>) => {
          onClick?.(event)(post);
        }}
      />
    );
  }, [isSelecting, isSelected, note.id, onClick, post]);

  if (post._isDeleted) {
    return null;
  }

  const deleteNoteExtraId = `deleteNote${note.id}`;
  
  return (
    isSelecting ? renderedPost : (
      <>
        <Menu isContextMenu>
          <MenuTrigger>
            {renderedPost}
          </MenuTrigger>
          <MenuList>
            {post.permissions.pin && !post.pinnedAt && (
              <MenuItem
                label="Pin"
                onClick={() => pin(postId)}
              />
            )}
            {post.permissions.unpin && !!post.pinnedAt && (
              <MenuItem
                label="Unpin"
                onClick={() => unpin(postId)}
              />
            )}
            <MenuItem
              label="Select"
              onClick={() => dispatch(startSelectOperation({
                noteId: post.parent,
                postId: post.id,
              }))}
            />
            {post.permissions.stick && (
              <MenuItem
                label="Stick"
                onClick={() => dispatch(startStickOperation({
                  fromNoteId: post.parent,
                  postIds: [post.id],
                }))}
              />
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
            {(post.permissions.delete || post.permissions.remove) && (
              <>
                <MenuDivider />
                {post.permissions.remove && (
                  <MenuItem label="Remove" onClick={() => remove()} />
                )}
                <MenuItem 
                  // colorScheme="red"
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
    )
  );
});
