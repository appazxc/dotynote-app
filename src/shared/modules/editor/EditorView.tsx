import React from 'react';

import { Box, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { JSONContent, generateHTML } from '@tiptap/core';

import { keepNDivs, removeEmptyDivsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';
import { getEditorStyles } from 'shared/theme/styles';

const Container = styled(Box)`
  white-space: pre-wrap;
  text-overflow: unset;
  word-wrap: break-word;
  
  ul {
    margin-inline-start: 1em;
  }

  div:empty::before {
    content: " ";
    display: block;
  }

  a {
    color: ${({ theme }) => {

    console.log('theme', theme);

    return theme.colors.blue['500'];
  }};

    &:hover {
      text-decoration: 'underline';
    }
  }
`;

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
    
    let result = maxLines ? keepNDivs(html, maxLines) : html;
    
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
