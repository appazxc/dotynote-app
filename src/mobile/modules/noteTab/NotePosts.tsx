import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { PostList } from 'shared/modules/noteTab/components/PostList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, togglePostSelect, updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  note: NoteEntity,
  search: string,
};

export const NotePosts = React.memo((props: Props) => {
  const { note, search } = props;
  const { id: noteId, postsSettings } = note;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const isSelecting = operation.type === operationTypes.SELECT && operation.noteId === noteId;
  const selectedPosts = operation.type === operationTypes.SELECT ? operation.postIds : EMPTY_ARRAY;
  
  const defaultPostClick = React.useCallback((_event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    navigate({ to: noteRoutePath, params: { noteId } });
  }, [navigate]);
  
  const concretePostClick = React.useCallback((post: PostEntity) => {
    dispatch(updateOperationConcretePost(post.id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    event.preventDefault();
    if ('concretePlace' in operation && operation.concretePlace) {
      concretePostClick(post);
      return;
    }

    if (isSelecting) {
      dispatch(togglePostSelect(post.id));
      return;
    }
    
    defaultPostClick(event, post.note.id);
  }, [dispatch, operation, isSelecting, defaultPostClick, concretePostClick]);

  const showPosts = !!postsSettings;
  
  if (!showPosts) {
    return null;
  }

  return (
    <>
      <PostList
        noteId={noteId}
        search={search}
        isSelecting={isSelecting}
        selectedPosts={selectedPosts}
        sort={postsSettings.sort}
        orderBy={postsSettings.orderById}
        pinnedOnTop={postsSettings.pinnedOnTop}
        onPostClick={handlePostClick}
      />
      <SelectConcretePlaceModal noteId={noteId} />
    </>
  );
});
