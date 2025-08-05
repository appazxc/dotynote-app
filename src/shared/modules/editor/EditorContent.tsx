import { Box, BoxProps } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { EditorContent as TiptapEditorContent } from '@tiptap/react';
import React from 'react';

import { getEditorStyles, getEditorStylesWithAmpersand } from 'shared/theme/styles';

type Props = {
  editor?: Editor;
} & BoxProps

export const EditorContent = React.memo(({ editor, ...boxProps }: Props) => {
  const css = React.useMemo(() => ({
    '& .ProseMirror': {
      minHeight: '100%',
      whiteSpace: 'break-spaces',
      wordBreak: 'break-word',
      outline: 'none',
      '& .is-empty:first-child::before': {
        color: 'var(--gray-4)',
        content: 'attr(data-placeholder)',
        float: 'left',
        height: 0,
        pointerEvents: 'none',
      },
      ...getEditorStylesWithAmpersand(getEditorStyles()),
    },
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
        />
      </Box>
    </Box>
  );
});