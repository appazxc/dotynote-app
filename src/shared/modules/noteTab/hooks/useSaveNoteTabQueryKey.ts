import React from 'react';

import { noteTabStore } from '../lib/noteTabStore';

import { useNoteTabId } from './useNoteTabId';

export const useSaveNoteTabQueryKey = (queryKey) => {
  const id = useNoteTabId();

  React.useEffect(() => {
    const value = {
      ...noteTabStore.get(id),
      queryKey,
    };

    noteTabStore.set(id, value);
  }, [id, queryKey]);
};
