import { generateText } from '@tiptap/core';
import { AxiosError } from 'axios';
import React from 'react';

import { useNote } from 'shared/api/hooks/useNote';
import { extensions } from 'shared/modules/editor/extensions';
import { getTabInfo } from 'shared/modules/space/helpers/tabHelpers';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

const getNoteErrorTitle = (status: number | undefined = 400) => {
  switch(status) {
  case 404:
    return 'Note not found';
  default:
    return `Error ${status}`;
  }
};

export const useTabTitle = (path: string, router) => {
  const { isNoteTab, noteId, title: tabTitle } = React.useMemo(() => {
    return getTabInfo(path, router);
  }, [path, router]);
  const getByIdNote = React.useMemo(() => noteSelector.makeGetEntityById(), []);

  const note = useAppSelector(state => getByIdNote(state, noteId));

  const { isLoading, error } = useNote(noteId, { enabled: !!noteId && !note });

  const title = React.useMemo(() => {
    if (isNoteTab && !note && isLoading && !error) {
      return 'Loading...';
    }

    if (error && error instanceof AxiosError) {
      return getNoteErrorTitle(error.response?.status);
    }

    if (tabTitle) {
      return tabTitle;
    }

    if (note) {
      return note.title || generateText(note.content || {}, extensions) || 'Untitled';
    }

    return 'Untitled';
  }, [isNoteTab, error, isLoading, note, tabTitle]);

  return title;
};