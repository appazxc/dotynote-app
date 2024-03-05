import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';

type Props = {
  editor?: Editor
} & BoxProps

export const EditorContent = ({ editor, ...boxProps }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <Box
      flexGrow="1"
      position="relative"
      minH="150"
      {...boxProps}
    >
      <Box
        position="absolute"
        w="full"
        h="full"
        onClick={() => {
          editor.commands.focus();
        }}
      />

      <TiptapEditorContent editor={editor} />
    </Box>
  );
};
