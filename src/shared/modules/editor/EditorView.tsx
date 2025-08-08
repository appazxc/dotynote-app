import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react';
import { JSONContent, generateHTML } from '@tiptap/core';
import React from 'react';

import { removeEmptyParagraphsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

type Props = {
  content?: JSONContent;
  maxLines?: number;
  removeEmptyDivsFromEnd?: boolean;
  css?: SystemStyleObject;
} & BoxProps

export const EditorView = React.memo(({ css, content: json, maxLines, removeEmptyDivsFromEnd, ...boxProps }: Props) => {
  const content = React.useMemo(() => {
    if (!json) {
      return '';
    }

    let result = generateHTML(json, extensions);
    
    if (removeEmptyDivsFromEnd) {
      result = removeEmptyDivsFromEndHelper(result);
    }

    result = result.replace(/<div class="para"><\/div>/g, '<div class="para"><br></div>');
    
    return result;
  }, [json, removeEmptyDivsFromEnd]);

  const boxCss = React.useMemo(() => ({
    '&.tiptap.ProseMirror': css,
  }), [css]);

  if (!content) {
    return null;
  }

  return (
    <Box
      css={boxCss}
      dangerouslySetInnerHTML={{ __html: content }}
      textOverflow={maxLines ? 'ellipsis' : undefined}
      lineClamp={maxLines}
      className="tiptap ProseMirror"
      {...boxProps}
    />
  );
});
