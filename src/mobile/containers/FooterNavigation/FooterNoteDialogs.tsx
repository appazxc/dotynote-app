import React from 'react';

import { queryClient } from 'shared/api/queryClient';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';
import { selectCanAddToNote } from 'shared/selectors/user/selectCanAddToNote';
import { selectCanAddToPosts } from 'shared/selectors/user/selectCanAddToPosts';
import { useAppSelector } from 'shared/store/hooks';

import { DotNoteMenuDrawer } from 'mobile/containers/drawers/DotNoteMenuDrawer';

type Props = {
  noteId: number,
};

const extraId = 'footerNoteDialogs';

export const FooterNoteDialogs = React.memo(({ noteId }: Props) => {
  const canAddToNote = useAppSelector(state => selectCanAddToNote(state, { noteId }));
  const canAddToPosts = useAppSelector(state => selectCanAddToPosts(state, { noteId }));
  const noteTabId = useNoteTabId();
  
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    queryClient.invalidateQueries({ queryKey });
  }, [noteTabId]);
  
  return (
    <>
      <DotNoteMenuDrawer
        noteId={noteId}
        canAddToNote={canAddToNote}
        canAddToPosts={canAddToPosts}
        modalsExtraId={extraId}
      />
      <EditPostSettingsModal noteId={noteId} extraId={extraId} />
      <CreatePostModal
        noteId={noteId}
        extraId={extraId}
        onCreate={handlePostCreate}
      />
    </>
  );
});
