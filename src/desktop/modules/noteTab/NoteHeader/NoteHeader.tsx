import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { NoteHeaderSearch } from 'shared/modules/noteTab/components/NoteHeaderSearch';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteEmptyHeader } from './NoteEmptyHeader';

type Props = {
  isWriteMode: boolean,
  search: string,
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const NoteHeader = React.memo(({ isWriteMode, search, onSearchChange }: Props) => {
  const editor = useEditorContext();
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);

  if (isSearchActive) {
    return <NoteHeaderSearch value={search} onChange={onSearchChange} />;
  }

  if (isAdvancedEditActive && isWriteMode) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteEmptyHeader />;
});
