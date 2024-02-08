import React from 'react';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { JSONContent } from '@tiptap/core';
import { generateHTML } from '@tiptap/html';

import { extensions } from './extensions';

type Props = {
  content?: JSONContent,
  maxLines?: number,
}

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

export const EditorView = ({ content: json, maxLines }: Props) => {
  const content = React.useMemo(() => {
    if (!json) {
      return '';
    }

    const html = generateHTML(json, extensions);

    return maxLines ? html.split('</div>').slice(0, maxLines).join('</div>') : html;
  }, [json, maxLines]);

  return (
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  );
};
