import React from 'react';

import { Box, Container } from '@chakra-ui/react';

import { SelectConcretePlaceModal } from 'shared/containers/modals/SelectConcretePlaceModal';
import { NoteBase } from 'shared/modules/noteTab/components/NoteBase';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NotePosts } from 'desktop/modules/noteTab/NotePosts';

type Props = {
  note: NoteEntity,
  isWriteMode: boolean,
  isSearchActive: boolean,
  search: string,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { note, isWriteMode, isSearchActive, search } = props;
  const { id: noteId, settings, postsSettings } = note;
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;

  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        {showNote && (
          <NoteBase
            id={noteId}
            isWriteMode={isWriteMode}
          />
        )}
        <NotePosts
          // key={noteId} // need this?
          note={note}
          search={search}
        />
      </Box>
      <SelectConcretePlaceModal noteId={noteId} />
    </Container>
  );
});