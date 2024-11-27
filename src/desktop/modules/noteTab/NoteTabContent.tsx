import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import { NoteBase } from 'shared/modules/noteTab/components/NoteBase';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NotePosts } from 'desktop/modules/noteTab/NotePosts';

type Props = {
  note: NoteEntity,
  parent?: NoteEntity | null,
  isWriteMode: boolean,
  isSearchActive: boolean,
  search: string,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { note, parent, isWriteMode, isSearchActive, search } = props;
  const { id: noteId, settings, postsSettings } = note;
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;

  return (
    <Container h="full" maxW="3xl">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        {showNote && (
          <NoteBase
            noteId={noteId}
            parent={parent}
            isWriteMode={isWriteMode}
          />
        )}
        <NotePosts
          note={note}
          search={search}
        />
      </Box>
    </Container>
  );
});