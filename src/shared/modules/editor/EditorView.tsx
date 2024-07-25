import React from 'react';

import { Box, useColorMode } from '@chakra-ui/react';
import { JSONContent, generateHTML } from '@tiptap/core';

import { getEditorStyles } from 'shared/theme/styles';

import { keepNParagraphs, removeEmptyParagraphsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

type Props = {
  content?: JSONContent,
  maxLines?: number,
  removeEmptyDivsFromEnd?: boolean
}

export const EditorView = ({ content: json, maxLines, removeEmptyDivsFromEnd }: Props) => {
  const { colorMode } = useColorMode();

  const content = React.useMemo(() => {
    if (!json) {
      return '';
    }

    const html = generateHTML(json, extensions);
    
    let result = maxLines ? keepNParagraphs(html, maxLines) : html;
    
    if (removeEmptyDivsFromEnd) {
      result = removeEmptyDivsFromEndHelper(result);
    }
    
    return result;
  }, [json, maxLines, removeEmptyDivsFromEnd]);

  const sx = React.useMemo(() => getEditorStyles({ colorMode }), [colorMode]);

  return (
    <Box sx={sx} dangerouslySetInnerHTML={{ __html: content }} />
  );
};
