import { Box, BoxProps } from '@chakra-ui/react';
import { Editor, EditorContent as TiptapEditorContent } from '@tiptap/react';
import React from 'react';

import { getEditorCss } from 'shared/theme/styles';

type Props = {
  editor?: Editor;
} & BoxProps

export const EditorContent = React.memo(({ editor, ...boxProps }: Props) => {
  const css = React.useMemo(() => ({
    '& .tiptap.ProseMirror': getEditorCss(),
  }), []);
  
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
      <Box
        asChild
        flex="1 1 0%"
        css={css}
      >
        <TiptapEditorContent
          editor={editor}
          role="presentation"
        />
      </Box>
    </Box>
  );
});