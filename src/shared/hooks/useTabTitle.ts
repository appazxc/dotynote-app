import React from 'react';

import { useNote } from 'shared/api/hooks/useNote';
import { getTabInfo } from 'shared/modules/space/helpers/tabHelpers';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

export const useTabTitle = (path: string, router) => {
  const { isNoteTab, noteId, title: tabTitle } = React.useMemo(() => {
    return getTabInfo(path, router);
  }, [path, router]);

  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  const { isLoading } = useNote(noteId, { enabled: !!noteId && !note });

  const title = React.useMemo(() => {
    if (isNoteTab && !note && isLoading) {
      return 'Loading...';
    }

    if (note) {
      return note.title || 'Untitled';
    }

    return tabTitle;
  }, [isNoteTab, isLoading, note, tabTitle]);

  return title;
};