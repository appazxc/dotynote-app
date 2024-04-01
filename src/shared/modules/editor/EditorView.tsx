import React from 'react';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { JSONContent, generateHTML } from '@tiptap/core';

import { keepNDivs, removeEmptyDivsFromEnd as removeEmptyDivsFromEndHelper } from './editor.helpers';
import { extensions } from './extensions';

const Container = styled(Box)`
  white-space: pre-wrap;
  text-overflow: unset;
  word-wrap: break-word;
  
  ul {
    list-style-type: initial;
    margin-inline-start: 1em;
  }

  div:empty::before {
    content: " ";
    display: block;
  }
`;

type Props = {
  content?: JSONContent,
  maxLines?: number,
  removeEmptyDivsFromEnd?: boolean
}

export const EditorView = ({ content: json, maxLines, removeEmptyDivsFromEnd }: Props) => {
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

  return (
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  );
};
