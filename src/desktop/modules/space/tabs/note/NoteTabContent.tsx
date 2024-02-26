import React from 'react';

import { Box, Container, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useQueryParams } from 'shared/hooks/useQueryParams';
import { Posts } from 'shared/modules/space/tabs/note/containers/Posts';

import { NoteBase } from './containers/NoteBase';

export const NoteTabContent = () => {
  const { noteId = '' } = useParams();
  const { postId = '' } = useQueryParams();
  const scrollRef = useScrollContext();

  React.useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [noteId, scrollRef]);

  return (
    <Container pt="10">
      <Stack gap="5">
        <Box>
          <NoteBase id={noteId} />
        </Box>
        <Posts
          key={noteId}
          noteId={noteId}
          postId={postId}
        />
      </Stack>
    </Container>
  );
};