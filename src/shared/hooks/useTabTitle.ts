import React from 'react';

import { AxiosError } from 'axios';

import { useNote } from 'shared/api/hooks/useNote';
import { getTabInfo } from 'shared/modules/space/helpers/tabHelpers';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

export const useTabTitle = (path: string, router) => {
  const { isNoteTab, noteId, title: tabTitle } = React.useMemo(() => {
    return getTabInfo(path, router);
  }, [path, router]);

  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  const { isLoading, error } = useNote(noteId, { enabled: !!noteId && !note });

  const title = React.useMemo(() => {
    if (isNoteTab && !note && isLoading && !error) {
      return 'Loading...';
    }

    if (error && error instanceof AxiosError) {
      return `Error: ${error.response?.status}`;
    }

    if (note) {
      return note.title || 'Untitled';
    }

    return tabTitle;
  }, [isNoteTab, error, isLoading, note, tabTitle]);

  return title;
};