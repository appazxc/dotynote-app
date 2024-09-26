import React from 'react';

import { Box, useColorMode } from '@chakra-ui/react';
import { JSONContent, generateHTML } from '@tiptap/core';

import { getEditorStyles } from 'shared/theme/styles';

import { removeEmptyParagraphsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

type Props = {
  content?: JSONContent,
  maxLines?: number,
  removeEmptyDivsFromEnd?: boolean
}

export const EditorView = React.memo(({ content: json, maxLines, removeEmptyDivsFromEnd }: Props) => {
  const { colorMode } = useColorMode();

  const content = React.useMemo(() => {
    if (!json) {
      return '';
    }

    let result = generateHTML(json, extensions);
    
    if (removeEmptyDivsFromEnd) {
      result = removeEmptyDivsFromEndHelper(result);
    }
    
    return result;
  }, [json, removeEmptyDivsFromEnd]);

  const sx = React.useMemo(() => getEditorStyles({ colorMode }), [colorMode]);
  
  if (!content) {
    return null;
  }

  return (
    <Box
      sx={sx}
      dangerouslySetInnerHTML={{ __html: content }}
      textOverflow={maxLines ? 'ellipsis' : undefined}
      noOfLines={maxLines}
    />
  );
});
