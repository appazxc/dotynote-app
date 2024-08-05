import React from 'react';

import { Box } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NoteEditor } from '../NoteEditor';

type Props = {
  id: number,
  isWriteMode: boolean,
  isMobile: boolean,
  content: NoteEntity['content']
}

export const NoteEditorBase = (props: Props) => {
  const { isWriteMode, isMobile, content } = props;

  return (
    <Box
      mt={isMobile ? '2' : '4'}
      flexGrow="1"
      display="flex"
      flexDirection="column"
      minH="40vh"
    >
      {isWriteMode ? <NoteEditor /> : <EditorView content={content} />}
    </Box>
  );
};
