import React from 'react';

import { Box, Container } from '@chakra-ui/react';

// import { useScrollContext } from 'shared/components/ScrollProvider';
import { Posts } from 'shared/modules/space/tabs/note/containers/Posts';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { NoteBase } from './components/NoteBase';

type Props = {
  noteId: IdentityType,
  isWriteMode: boolean,
  showPosts: boolean,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { noteId, isWriteMode, showPosts } = props;
  // const scrollRef = useScrollContext();

  // React.useEffect(() => {
  //   if (scrollRef?.current) {
  //     scrollRef.current.scrollTo(0, 0);
  //   }
  // }, [noteId, scrollRef]);
  
  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        <NoteBase
          id={noteId}
          isWriteMode={isWriteMode}
        />
        {showPosts && (
          <Posts
            key={noteId}
            noteId={noteId}
          />
        )}
      </Box>
    </Container>
  );
});