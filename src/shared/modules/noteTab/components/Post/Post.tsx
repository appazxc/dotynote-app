import { Box } from '@chakra-ui/react';
import React from 'react';

import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { Post as PostComponent } from 'shared/components/Post';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { InternalPosts } from 'shared/modules/noteTab/components/Post/InternalPosts';
import { PostWithMenu } from 'shared/modules/noteTab/components/Post/PostWithMenu';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
  internalLevel: number,
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => void,
  onDelete: () => void,
}

export const Post = React.memo((props: Props) => {
  const { postId, onClick, onDelete, isSelecting, isSelected, internalLevel } = props;
  const getByIdPost = React.useMemo(() => postSelector.makeGetEntityById(), []);
  const getByIdNote = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const post = useAppSelector(state => getByIdPost(state, postId));
  const note = useAppSelector(state => getByIdNote(state, post?.note.id));
  const dispatch = useAppDispatch();

  invariant(post, 'Missing post', { id: postId });
  invariant(note, 'Missing note');

  const { mutate: deleteNote } = useDeleteNotes(note.id);

  const deleteNoteExtraId = `deleteNote${note.id}`;
  const allowInternal = internalLevel === 0;
  const showInternal = allowInternal && post.parent.postsSettings?.internal && !!post.internal?.max;

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
      <>
        <PostComponent
          isSelecting={isSelecting}
          isSelected={isSelected}
          isPinned={!!post.pinnedAt}
          noteId={note.id}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => {
            onClick?.(event)(post);
          }}
        />
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
  }, [dispatch, isSelecting, isSelected, deleteNoteExtraId, deleteNote, note.id, onClick, post]);

  if (post._isDeleted) {
    return null;
  }

  return (
    isSelecting ? renderedPost : (
      <Box>
        <PostWithMenu
          internalLevel={internalLevel}
          post={post}
          deleteNoteExtraId={deleteNoteExtraId}
        >
          {renderedPost}
        </PostWithMenu>
        {showInternal && (
          <InternalPosts post={post} internalLevel={internalLevel} />
        )}
      </Box>
    )
  );
});
