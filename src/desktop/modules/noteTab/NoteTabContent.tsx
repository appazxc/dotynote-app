import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
import { NotePosts } from 'shared/modules/noteTab/components/NotePosts';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  note: NoteEntity;
  parent?: NoteEntity | null;
  isWriteMode: boolean;
  isSearchActive: boolean;
  search: string;
}

export const NoteTabContent = React.memo((props: Props) => {
  const { note, parent, isWriteMode, isSearchActive, search } = props;
  const { id: noteId, settings, postsSettings } = note;
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;
  const [visible, setVisible] = React.useState(!showPosts);
  // hack to prevent screen jumping when restoring the scroll <TabScrollRestoration />
  const handleScrollRestoration = React.useCallback(() => setVisible(true), []);
console.log('visible', visible);
  return (
    <Container
      h="full"
      maxW="3xl"
      opacity={visible ? 1 : 0}
      px="0"
    >
      <Box
        height="fit-content"
        minHeight="full"
        display="flex"
        flexDirection="column"
        gap="14"
        pb="20"
      >
        {showNote && (
          <NoteContent
            noteId={noteId}
            parent={parent}
            isWriteMode={isWriteMode}
          />
        )}
        {showPosts && (
          <Box px="4">
            <NotePosts
              note={note}
              search={search}
              onScrollRestoration={handleScrollRestoration}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
});