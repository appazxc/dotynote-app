import React from 'react';

import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { generateHTML } from '@tiptap/html';

import { extensions } from './extensions';

type Props = {
  content?: object
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
    content: ' ';
    display: inline;
  }
`;

export const EditorView = ({ content: json }: Props) => {
  const content = React.useMemo(() => {
    if (!json) {
      return '';
    }

    return generateHTML(json, extensions);
  }, [json]);

  return (
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  );
};
