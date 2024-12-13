import { Container, Stack } from '@chakra-ui/react';

import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NotePosts } from 'mobile/modules/noteTab/NotePosts';

type Props = {
  note: NoteEntity,
  isWriteMode: boolean,
  isSearchActive: boolean,
  search: string,
}

export const NoteTabContent = (props: Props) => {
  const { note, isWriteMode, search, isSearchActive } = props;
  const { id: noteId, settings, postsSettings } = note;
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;
  
  return (
    <Container h="full">
      <Stack
        gap="5"
        pt="3"
        h="full"
      >
        {showNote && (
          <NoteContent
            isMobile
            noteId={noteId}
            isWriteMode={isWriteMode}
          />
        )}

        <NotePosts 
          note={note}
          search={search}
        />
      </Stack>
    </Container>
  );
};