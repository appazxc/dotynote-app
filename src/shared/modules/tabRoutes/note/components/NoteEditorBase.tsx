import React from 'react';

import { Box } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { NoteEditor } from 'shared/modules/tabRoutes/note/components/NoteEditor';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  id: number,
  isWriteMode: boolean,
  isMobile?: boolean,
  content: NoteEntity['content']
}

export const NoteEditorBase = (props: Props) => {
  const { isWriteMode, content } = props;

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
};
