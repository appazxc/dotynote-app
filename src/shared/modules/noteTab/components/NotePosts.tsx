import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { showModal } from 'shared/modules/modal/modalSlice';
import { AllNotesList } from 'shared/modules/noteTab/components/AllNotesList';
import { StickNotesList } from 'shared/modules/noteTab/components/StickNotesList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, togglePostSelect, updateOperationConcretePost } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  note: NoteEntity;
  search: string;
  onScrollRestoration?: () => void;
};

export const NotePosts = React.memo((props: Props) => {
  const { note, search, onScrollRestoration } = props;
  const { id: noteId, postsSettings } = note;
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const navigate = useNavigate();
  const isSelecting = operation.type === operationTypes.SELECT && operation.noteId === noteId;
  const selectedPosts = operation.type === operationTypes.SELECT ? operation.postIds : EMPTY_ARRAY;
  const isConcretePlace = 'concretePlace' in operation && operation.concretePlace;

  invariant(postsSettings, 'postsSettings is required');

  const { listType } = postsSettings;
  
  const defaultPostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, noteId: string) => {
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
    defaultPostClick(event, post.note.id);
  }, [defaultPostClick]);

  const handleOverlayClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    event.preventDefault();

    if (isConcretePlace) {
      concretePostClick(post);
      return;
    }

    if (isSelecting) {
      dispatch(togglePostSelect(post.id));
      return;
    }
  }, [dispatch, isSelecting, concretePostClick, isConcretePlace]);

  const showPosts = !!postsSettings;
  
  if (!showPosts) {
    return null;
  }

  return (
    <>
      {listType == 'stick' ? (
        <StickNotesList
          noteId={noteId}
          search={search}
          isSelecting={isSelecting}
          hasOverlay={isSelecting || isConcretePlace}
          selectedPosts={selectedPosts}
          sort={postsSettings.sort}
          orderBy={postsSettings.orderBy}
          onPostClick={handlePostClick}
          onOverlayClick={handleOverlayClick}
          onScrollRestoration={onScrollRestoration}
        />
      ) : (
        <AllNotesList
          noteId={noteId}
          onScrollRestoration={onScrollRestoration}
        />
      )
      }
      
      <SelectConcretePlaceModal noteId={noteId} />
    </>
  );
});
