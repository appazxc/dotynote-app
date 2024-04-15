import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteGapHeader } from './NoteGapHeader';

export const NoteHeader = React.memo(() => {
  const editor = useEditorContext();
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  if (!editor) {
    return null;
  }

  if (isAdvancedEditActive) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteGapHeader />;
});
