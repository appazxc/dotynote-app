import React from 'react';

import { Container, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { NoteContentCards } from 'shared/modules/space/tabRoutes/note/components/NoteContentCards';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabHeader, TabLayout } from 'mobile/modules/space/components/TabLayout';

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
    <TabLayout 
      header={<TabHeader>Search</TabHeader>} 
      footer={<FooterNavigation />}
    >
      <Container pt="4">
        <Text fontWeight="500" mb="4">Create note</Text>
        <NoteContentCards isMobile />
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </TabLayout>
  );
};
