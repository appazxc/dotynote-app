import { Box } from '@chakra-ui/react';
import React from 'react';

import { EditorView } from 'shared/modules/editor';
import { NoteEditor } from 'shared/modules/noteTab/components/NoteEditor';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  noteId: string;
  isWriteMode: boolean;
  isMobile?: boolean;
  isContentEmpty: boolean;
  content: NoteEntity['content'];
}

export const NoteEditorBase = React.memo((props: Props) => {
  const { isWriteMode, isContentEmpty, content } = props;

  const showEditor = isWriteMode || !isContentEmpty;
  
  if (!showEditor) {
    return null;
  }

  return (
    <Box
      mt="4"
      flexGrow="1"
      display="flex"
      flexDirection="column"
      minH={isWriteMode ? '40vh' : undefined}
      textStyle="content"
    >
      {isWriteMode ? <NoteEditor /> : <EditorView content={content} />}
    </Box>
  );
});
