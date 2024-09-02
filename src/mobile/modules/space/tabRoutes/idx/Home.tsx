import React from 'react';

import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { NoteContentCards } from 'shared/modules/noteTab/components/NoteContentCards';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: '/n/$noteId',
      params: { noteId: id }, 
      replace: true,
    }).finally(() => {
      dispatch(hideModal());
    });
  }, [navigate, dispatch]);

  return (
    <Layout 
      header={<LayoutHeader title="Create note" />} 
    >
      <Container pt="4">
        <NoteContentCards isMobile />
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </Layout>
  );
};
