import React from 'react';

import {
  Box,
  Container,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { NoteInPost } from 'shared/components/NoteInPost';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { HomeNoteSearch } from 'shared/modules/tabRoutes/idx/HomeNoteSearch';
import { HomeSearchInput } from 'shared/modules/tabRoutes/idx/HomeSearchInput';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';
import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteCreate } from './NoteCreate';

export const Home = React.memo(() => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: '/n/$noteId',
      params: { noteId: id }, 
      replace: true,
    });
  }, [navigate]);

  const renderNote = (id: number) => {
    return (
      <DesktopTabLink
        key={id}
        to="/n/$noteId"
        params={{ noteId: String(id) }}
      >
        <NoteInPost noteId={id} />
      </DesktopTabLink>
    );
  };

  const showSearch = search.length >= 2;

  return (
    <TabLayout>
      <Container>
        <Box
          pb="10"
          pt="5"
          flexDirection="column"
          display="flex"
          gap="10"
        >
          <HomeSearchInput />
          {showSearch ? <HomeNoteSearch value={search} renderNote={renderNote} /> : <NoteCreate />}
        </Box>
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </TabLayout>
  );
});