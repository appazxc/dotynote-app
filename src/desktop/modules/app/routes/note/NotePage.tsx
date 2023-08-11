import React from 'react';

import { Box, Container, Stack } from '@chakra-ui/react';
import { Posts } from './containers/Posts';
import { useParams } from 'react-router';

export const NotePage = () => {
  const { noteId = '' } = useParams();

  return (
    <Container>
      <Stack gap="5">
        <Box
          h="150"
          border="1px solid green"
          borderRadius="lg"
        >
          note content
        </Box>
        <Posts noteId={noteId} />
      </Stack>
    </Container>
  );
};
