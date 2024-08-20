import React from 'react';

import { useEditorContext } from 'shared/modules/editor';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteEmptyHeader } from './NoteEmptyHeader';

type Props = {
  isWriteMode: boolean,
}

export const NoteHeader = React.memo(({ isWriteMode }: Props) => {
  const editor = useEditorContext();
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  if (isAdvancedEditActive && isWriteMode) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteEmptyHeader />;
});
