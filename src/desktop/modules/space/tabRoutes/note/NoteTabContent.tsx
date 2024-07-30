import React from 'react';

import { Box, Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { Posts } from 'shared/modules/space/tabRoutes/note/containers/Posts';
import { useAppDispatch } from 'shared/store/hooks';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';

import { NoteBase } from './NoteBase';

type Props = {
  noteId: number,
  isWriteMode: boolean,
  showPosts: boolean,
}

export const NoteTabContent = React.memo((props: Props) => {
  const { noteId, isWriteMode, showPosts } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const onPostClick = React.useCallback((e) => (noteId: string) => {
    e.preventDefault();
    if (e.metaKey) {
      dispatch(openTab({ 
        route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(noteId) } }),
      }));
    } else {
      navigate({ to: '/n/$noteId', params: { noteId } });
    }
  }, [navigate, dispatch]);

  return (
    <Container h="full">
      <Box
        h="full"
        display="flex"
        flexDirection="column"
        gap="10"
      >
        <NoteBase
          id={String(noteId)}
          isWriteMode={isWriteMode}
        />
        {showPosts && (
          <Posts
            key={noteId}
            noteId={noteId}
            onPostClick={onPostClick}
          />
        )}
      </Box>
    </Container>
  );
});