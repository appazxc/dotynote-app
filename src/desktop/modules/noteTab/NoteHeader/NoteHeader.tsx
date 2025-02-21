import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { PostsSearch } from 'shared/modules/noteTab/components/PostsSearch';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteEmptyHeader } from './NoteEmptyHeader';

type Props = {
  isWriteMode: boolean;
  search: string;
  onSearchChange: (value: string) => void;
}

export const NoteHeader = React.memo(({ isWriteMode, search, onSearchChange }: Props) => {
  const editor = useEditorContext();
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);

  if (isSearchActive) {
    return <PostsSearch value={search} onChange={onSearchChange} />;
  }

  if (isAdvancedEditActive && isWriteMode) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteEmptyHeader />;
});
