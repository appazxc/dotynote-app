import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { PostsSearch } from 'shared/modules/noteTab/components/PostsSearch';
import { useAppSelector } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteEmptyHeader } from './NoteEmptyHeader';

type Props = {
  isWriteMode: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  note: NoteEntity
}

export const NoteHeader = React.memo(({ isWriteMode, search, onSearchChange, note }: Props) => {
  const editor = useEditorContext();
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);

  if (isSearchActive) {
    return <PostsSearch value={search} onChange={onSearchChange} />;
  }

  if (isAdvancedEditActive && isWriteMode && !note.settings?.hide) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteEmptyHeader />;
});
