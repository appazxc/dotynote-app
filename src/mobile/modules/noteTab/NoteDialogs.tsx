import React from 'react';

import { CreateNoteDotModal } from 'shared/containers/modals/CreateNoteDotModal';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { CreatePostWithImagesModal } from 'shared/containers/modals/CreatePostWithImagesModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { useAppDispatch } from 'shared/store/hooks';
import { turnOnQueryNextPage } from 'shared/util/api/turnOnQueryNextPage';

type Props = {
  noteId: number,
};

export const NoteDialogs = React.memo(({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const noteTabId = useNoteTabId(noteId);
  
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    if (queryKey) {
      turnOnQueryNextPage(queryKey);
    }

    dispatch(hideModal());
  }, [noteTabId, dispatch]);
  
  return (
    <>
      <CreatePostModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
      <CreatePostWithImagesModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
      <CreateNoteDotModal 
        noteId={noteId}
      />
    </>
  );
});
