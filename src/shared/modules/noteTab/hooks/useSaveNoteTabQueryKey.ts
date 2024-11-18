import React from 'react';

import { noteTabStore } from '../lib/noteTabStore';

import { useNoteTabId } from './useNoteTabId';

export const useSaveNoteTabQueryKey = (noteId, queryKey) => {
  const id = useNoteTabId(noteId);

  React.useEffect(() => {
    const value = {
      ...noteTabStore.get(id),
      queryKey,
    };

    noteTabStore.set(id, value);
  }, [id, queryKey]);
};
