import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { Editor } from '@tiptap/react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';

type Props = {
  editor?: Editor
} & BoxProps

export const EditorContent = React.memo(({ editor, ...boxProps }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      flexGrow="1"
      position="relative"
      minH="40vh"
      display="flex"
      {...boxProps}
    >
      <EditorBox
        editor={editor}
      />
    </Box>
  );
});

const EditorBox = styled(TiptapEditorContent)`
  flex: 1 1 0%;
`;