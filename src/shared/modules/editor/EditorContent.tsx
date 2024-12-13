import { Box, BoxProps } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';
import React from 'react';

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
      display="flex"
      {...boxProps}
    >
      <Box asChild flex="1 1 0%">
        <TiptapEditorContent
          editor={editor}
        />
      </Box>
    </Box>
  );
});