import { Box } from '@chakra-ui/react';
import React from 'react';

import { EditorView } from 'shared/modules/editor';
import { NoteEditor } from 'shared/modules/noteTab/components/NoteEditor';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  noteId: number,
  isWriteMode: boolean,
  isMobile?: boolean,
  isTextContentEmpty: boolean,
  content: NoteEntity['content']
}

export const NoteEditorBase = React.memo((props: Props) => {
  const { isWriteMode, isTextContentEmpty, content } = props;

  const showEditor = isWriteMode || !isTextContentEmpty;
  
  if (!showEditor) {
    return null;
  }

  return (
    <Box
      mt="4"
      flexGrow="1"
      display="flex"
      flexDirection="column"
      minH="40vh"
    >
      {isWriteMode ? <NoteEditor /> : <EditorView content={content} />}
    </Box>
  );
});
