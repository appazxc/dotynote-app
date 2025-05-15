import React from 'react';

import { activateUserAllTypeQueriesNextPage } from 'shared/actions/activateUserAllTypeQueriesNextPage';
import { CreateNoteDotModal } from 'shared/containers/modals/CreateNoteDotModal';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { CreatePostWithImagesModal } from 'shared/containers/modals/CreatePostWithImagesModal';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useNoteTabQueryKey } from 'shared/modules/noteTab/hooks/useNoteTabQueryKey';
import { useAppDispatch } from 'shared/store/hooks';
import { activateInfinityQueryNextPage } from 'shared/util/api/activateInfinityQueryNextPage';

import { CreateNoteDrawer } from 'mobile/containers/drawers/CreateNoteDrawer';
import { NoteMenuDrawer } from 'mobile/containers/drawers/NoteMenuDrawer';

type Props = {
  noteId: string;
};

export const NoteDialogs = React.memo(({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const getQueryKey = useNoteTabQueryKey(noteId);
  
  const handleCreate = React.useCallback(() => {
    activateInfinityQueryNextPage(getQueryKey());
    dispatch(activateUserAllTypeQueriesNextPage());
    dispatch(hideModal());
    dispatch(hideDrawer());
  }, [getQueryKey, dispatch]);
  
  const handleError = React.useCallback(() => {
    dispatch(hideModal());
    dispatch(hideDrawer());
  }, [dispatch]);

  return (
    <>
      <CreateNoteModal onCreate={handleCreate} onError={handleError} />
      <CreatePostModal noteId={noteId} onCreate={handleCreate} />
      <CreatePostWithImagesModal noteId={noteId} onCreate={handleCreate} />
      <CreateNoteDotModal noteId={noteId} />
      <NoteMenuDrawer noteId={noteId} />
      <CreateNoteDrawer onCreate={handleCreate} onError={handleError} />
    </>
  );
});
