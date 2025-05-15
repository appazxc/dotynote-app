import React from 'react';

import { EMPTY_ARRAY } from 'shared/constants/common';
import { modalIds } from 'shared/constants/modalIds';
import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { AllTypeList } from 'shared/modules/noteTab/components/AllTypeList';
import { StickTypeList } from 'shared/modules/noteTab/components/StickTypeList/StickTypeList';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { 
  operationTypes, 
  toggleNoteSelect, 
  togglePostSelect, 
  updateOperationConcretePost, 
} from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
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
  const isSelecting = operation.type === operationTypes.SELECT && operation.parentId === noteId;
  const selectedPosts = operation.type === operationTypes.SELECT ? operation.postIds : EMPTY_ARRAY;
  const selectedNotes = operation.type === operationTypes.SELECT ? operation.noteIds : EMPTY_ARRAY;
  const isConcretePlace = 'concretePlace' in operation && operation.concretePlace;

  invariant(postsSettings, 'postsSettings is required');

  const { listType } = postsSettings;

  const concretePostClick = React.useCallback((id: string) => {
    dispatch(updateOperationConcretePost(id));
    dispatch(showModal({ id: modalIds.selectConcretePlace }));
  }, [dispatch]);

  const handleOverlayClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (id: string) => {
    event.preventDefault();

    if (isConcretePlace) {
      concretePostClick(id);
      return;
    }

    if (isSelecting) {
      dispatch(togglePostSelect(id));
      return;
    }
  }, [dispatch, isSelecting, concretePostClick, isConcretePlace]);

  const handleNoteOverlayClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (id: string) => {
    event.preventDefault();

    if (isSelecting) {
      dispatch(toggleNoteSelect(id));
      return;
    }
  }, [dispatch, isSelecting]);

  const showPosts = !!postsSettings;
  
  if (!showPosts) {
    return null;
  }

  return (
    <>
      {listType == 'stick' ? (
        <StickTypeList
          noteId={noteId}
          search={search}
          isSelecting={isSelecting}
          hasOverlay={isSelecting || isConcretePlace}
          selectedPosts={selectedPosts}
          sort={postsSettings.sort}
          orderBy={postsSettings.orderBy}
          onOverlayClick={handleOverlayClick}
          onScrollRestoration={onScrollRestoration}
        />
      ) : (
        <AllTypeList
          noteId={noteId}
          search={search}
          isSelecting={isSelecting}
          selectedNotes={selectedNotes}
          hasOverlay={isSelecting}
          filters={postsSettings.filters}
          onOverlayClick={handleNoteOverlayClick}
          onScrollRestoration={onScrollRestoration}
        />
      )
      }
      
      <SelectConcretePlaceModal noteId={noteId} />
    </>
  );
});
