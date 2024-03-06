import React from 'react';

import { Box, Container, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useQueryParams } from 'shared/hooks/useQueryParams';
import { Posts } from 'shared/modules/space/tabs/note/containers/Posts';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { NoteBase } from './components/NoteBase';
import { RwMode } from './constants';

type Props = {
  noteId: IdentityType,
  isWriteMode: boolean,
}

export const NoteTabContent = (props: Props) => {
  const { noteId, isWriteMode } = props;
  const { postId = '' } = useQueryParams();
  const scrollRef = useScrollContext();

  React.useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [noteId, scrollRef]);

  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
      >
        <NoteBase id={noteId} isWriteMode={isWriteMode} />
        {/* <Posts
          key={noteId}
          noteId={noteId}
          postId={postId}
        /> */}
      </Box>
    </Container>
  );
};