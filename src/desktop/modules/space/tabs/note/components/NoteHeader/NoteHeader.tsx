import React from 'react';

import { useBoolean } from '@chakra-ui/react';

import { useEditorContext } from 'shared/modules/editor';

import { NoteEditorHeader } from './NoteEditorHeader';
import { NoteGapHeader } from './NoteGapHeader';

export const NoteHeader = React.memo(() => {
  const editor = useEditorContext();

  if (!editor) {
    return null;
  }

  if (true) {
    return <NoteEditorHeader editor={editor} />;
  }

  return <NoteGapHeader />;
});
