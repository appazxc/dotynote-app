import React from 'react';

import { queryClient } from 'shared/api/queryClient';
import { CreatePostModal } from 'shared/containers/modals/CreatePostModal';
import { useNoteTabId } from 'shared/modules/noteTab/hooks/useNoteTabId';
import { noteTabStore } from 'shared/modules/noteTab/lib/noteTabStore';

type Props = {
  noteId: number,
};

export const NoteDialogs = React.memo(({ noteId }: Props) => {
  const noteTabId = useNoteTabId();
  
  const handlePostCreate = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    queryClient.invalidateQueries({ queryKey });
  }, [noteTabId]);
  
  return (
    <>
      <CreatePostModal
        noteId={noteId}
        onCreate={handlePostCreate}
      />
    </>
  );
});
