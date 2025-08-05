import { Box, BoxProps } from '@chakra-ui/react';
import { JSONContent, generateHTML } from '@tiptap/core';
import React from 'react';

import { getEditorStyles, getEditorStylesWithAmpersand } from 'shared/theme/styles';

import { removeEmptyParagraphsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

type Props = {
  content?: JSONContent;
  maxLines?: number;
  removeEmptyDivsFromEnd?: boolean;
} & BoxProps

export const EditorView = React.memo(({ content: json, maxLines, removeEmptyDivsFromEnd, ...boxProps }: Props) => {
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

  const sx = React.useMemo(() => ({ 
    whiteSpace: 'break-spaces',
    wordBreak: 'break-word', 
    ...getEditorStylesWithAmpersand(getEditorStyles()), 
  }), []);
  
  if (!content) {
    return null;
  }

  return (
    <Box
      css={sx}
      dangerouslySetInnerHTML={{ __html: content }}
      textOverflow={maxLines ? 'ellipsis' : undefined}
      lineClamp={maxLines}
      {...boxProps}
    />
  );
});
