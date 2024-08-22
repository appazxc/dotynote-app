import React from 'react';

import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { NoteCreate } from 'mobile/modules/space/tabRoutes/idx/NoteCreate';

export const Home = () => {
  const navigate = useNavigate();

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: '/n/$noteId',
      params: { noteId: id }, 
      replace: true,
    });
  }, [navigate]);

  return (
    <Layout 
      header={<LayoutHeader title="Create note" />} 
    >
      <Container pt="4">
        <NoteCreate />
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </Layout>
  );
};
