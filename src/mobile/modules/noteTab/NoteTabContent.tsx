import { Box, Container, Stack } from '@chakra-ui/react';
import React from 'react';

import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NotePosts } from 'mobile/modules/noteTab/NotePosts';

type Props = {
  note: NoteEntity;
  isWriteMode: boolean;
  isSearchActive: boolean;
  search: string;
}

export const NoteTabContent = (props: Props) => {
  const { note, isWriteMode, search, isSearchActive } = props;
  const { id: noteId, settings, postsSettings } = note;
  const showPosts = !!postsSettings;
  const showNote = (!isSearchActive && !settings?.hide) || !showPosts;
  const [visible, setVisible] = React.useState(!showPosts);
  
  // hack to prevent screen jumping when restoring the scroll <TabScrollRestoration />
  const handleScrollRestoration = React.useCallback(() => setVisible(true), []);

  return (
    <Container
      h="full" 
      opacity={visible ? 1 : 0}
      px="0"
    >
      <Stack
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

        {showPosts && (
          <Box px="4">
            <NotePosts 
              note={note}
              search={search}
              onScrollRestoration={handleScrollRestoration}
            />
          </Box>
        )}
      </Stack>
    </Container>
  );
};