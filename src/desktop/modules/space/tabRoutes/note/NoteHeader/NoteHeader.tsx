import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteGapHeader } from './NoteGapHeader';

type Props = {
  isWriteMode: boolean,
}

export const NoteHeader = React.memo(({ isWriteMode }: Props) => {
  const editor = useEditorContext();
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  if (!editor) {
    return null;
  }

  if (isAdvancedEditActive && isWriteMode) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteGapHeader />;
});
