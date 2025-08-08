import { Box, BoxProps, SystemStyleObject } from '@chakra-ui/react';
import { JSONContent, generateHTML } from '@tiptap/core';
import React from 'react';

import { cn } from 'shared/lib/tiptap-utils';

import { removeEmptyParagraphsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

type Props = {
  content?: JSONContent;
  maxLines?: number;
  removeEmptyDivsFromEnd?: boolean;
  css?: SystemStyleObject;
} & BoxProps

export const EditorView = React.memo((props: Props) => {
  const { css, content: json, maxLines, removeEmptyDivsFromEnd, className, ...boxProps } = props;
  
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

  const boxCss = React.useMemo(() => {
    const cn = className ? className.split(' ').map(c => `.${c}`) : '';
    return {
      [`&.tiptap.ProseMirror${cn}`]: css,
      _dark: {
        '--heading-size-h1': '40px',
      },
    };
  }, [css, className]);

  if (!content) {
    return null;
  }

  return (
    <Box
      css={boxCss}
      dangerouslySetInnerHTML={{ __html: content }}
      textOverflow={maxLines ? 'ellipsis' : undefined}
      lineClamp={maxLines}
      className={cn('tiptap ProseMirror', className)}
      {...boxProps}
    />
  );
});
