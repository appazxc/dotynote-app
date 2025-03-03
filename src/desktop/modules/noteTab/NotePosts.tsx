import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { showModal } from 'shared/modules/modal/modalSlice';
import { PostList } from 'shared/modules/noteTab/components/PostList/PostList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, togglePostSelect, updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';

type Props = {
  note: NoteEntity;
  search: string;
  onScrollRestoration?: () => void;
};

export const NotePosts = React.memo((props: Props) => {
  const { note, search, onScrollRestoration } = props;
  const { id: noteId, postsSettings } = note;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const isSelecting = operation.type === operationTypes.SELECT && operation.noteId === noteId;
  const selectedPosts = operation.type === operationTypes.SELECT ? operation.postIds : EMPTY_ARRAY;
  
  const defaultPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildNoteTabRoute(noteId, { parent: note.id }),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId }, search: { parent: note.id } });
    }
  }, [navigate, dispatch, note.id]);
  
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
  }, [dispatch, operation, defaultPostClick, concretePostClick, isSelecting]);

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
        onScrollRestoration={onScrollRestoration}
      />
      <SelectConcretePlaceModal noteId={noteId} />
    </>
  );
});
