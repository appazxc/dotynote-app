import React from 'react';

import { noteTabStore } from '../lib/noteTabStore';

import { useNoteTabId } from './useNoteTabId';

export const useGetNoteTabQueryKey = (noteId) => {
  const noteTabId = useNoteTabId(noteId);

  const getQueryKey = React.useCallback(() => {
    const { queryKey } = noteTabStore.get(noteTabId) || {};

    return queryKey;
  }, [noteTabId]);

  return getQueryKey;
};
