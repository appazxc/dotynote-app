import React from 'react';

import { Box, BoxProps } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';

type Props = {
  editor?: Editor
} & BoxProps

export const EditorContent = React.memo(({ editor, ...boxProps }: Props) => {
  if (!editor) {
    return null;
  }
// console.log('editor', editor.getText());
  return (
    <Box
      flexGrow="1"
      position="relative"
      minH="40vh"
      {...boxProps}
    >
      <Box
        position="absolute"
        w="full"
        h="full"
        onClick={() => {
          editor.commands.focus('end');
        }}
      />

      <TiptapEditorContent editor={editor} />
    </Box>
  );
});
