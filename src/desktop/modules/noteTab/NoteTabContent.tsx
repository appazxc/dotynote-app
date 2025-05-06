import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { NoteContent } from 'shared/modules/noteTab/components/NoteContent';
import { NotePosts } from 'shared/modules/noteTab/components/NotePosts';
import { useAppDispatch } from 'shared/store/hooks';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // hack to prevent screen jumping when restoring the scroll <TabScrollRestoration />
  const handleScrollRestoration = React.useCallback(() => setVisible(true), []);

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, noteId: number) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildNoteTabRoute(noteId, { parent: note.id }),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId }, search: { parent: note.id } });
    }
  }, [navigate, dispatch, note.id]);

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
              onPostClick={handlePostClick}
              onScrollRestoration={handleScrollRestoration}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
});