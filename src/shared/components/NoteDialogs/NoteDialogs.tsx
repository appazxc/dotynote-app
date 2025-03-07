import React from 'react';

import { CreateNoteDotModal } from 'shared/containers/modals/CreateNoteDotModal';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { CreatePostWithImagesModal } from 'shared/containers/modals/CreatePostWithImagesModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useGetNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useGetNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';

type Props = {
  noteId: number;
};

export const NoteDialogs = React.memo(({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const getQueryKey = useGetNoteTabQueryKey(noteId);
  
  const handlePostCreate = React.useCallback(() => {
    activateInfinityQueryNextPage(getQueryKey());
    dispatch(hideModal());
  }, [getQueryKey, dispatch]);
  
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
