import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { invalidateHubPosts } from 'shared/actions/invalidateHubPosts';
import { NoteMediaCards } from 'shared/components/NoteMediaCards';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: noteRoutePath,
      params: { noteId: id }, 
      replace: true,
    }).finally(() => {
      dispatch(invalidateHubPosts());
      dispatch(hideModal());
    });
  }, [navigate, dispatch]);

  return (
    <Layout 
      header={<LayoutHeader title="Create note" />} 
    >
      <Container pt="4">
        <NoteMediaCards isMobile />
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </Layout>
  );
};

export default Home;