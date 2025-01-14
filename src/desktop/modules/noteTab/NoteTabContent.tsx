import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
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
  const [visible, setVisible] = React.useState(false);

  // hack to prevent screen jumping when restoring the scroll <TabScrollRestoration />
  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 10);
  }, []);

  return (
    <Container
      h="full"
      maxW="3xl"
      opacity={visible ? 1 : 0}
    >
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        {showNote && (
          <NoteContent
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