import { useCurrentEditor } from '@tiptap/react';
import React from 'react';

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
  const { editor } = useCurrentEditor();
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);

  if (isSearchActive) {
    return <PostsSearch value={search} onChange={onSearchChange} />;
  }

  if (editor && isAdvancedEditActive && isWriteMode && !note.settings?.hide) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteEmptyHeader />;
});
