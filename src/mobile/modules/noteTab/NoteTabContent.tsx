import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
import { NotePosts } from 'shared/modules/noteTab/components/NotePosts';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

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
  const navigate = useNavigate();
  
  // hack to prevent screen jumping when restoring the scroll <TabScrollRestoration />
  const handleScrollRestoration = React.useCallback(() => setVisible(true), []);

  const handlePostClick = React.useCallback((_event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    navigate({ to: noteRoutePath, params: { noteId }, search: { parent: note.id } });
  }, [navigate, note.id]);

  return (
    <Container
      h="full" 
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
        pt="3"
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
              onPostClick={handlePostClick}
              onScrollRestoration={handleScrollRestoration}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};