import {
  Box,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { invalidateHubPosts } from 'shared/actions/invalidateHubPosts';
import { NoteMediaCards } from 'shared/components/NoteMediaCards';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export const NoteCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const handleCreateNote = React.useCallback((noteId: number) => {
    navigate({
      to: noteRoutePath,
      params: { noteId: String(noteId) }, 
      replace: true,
    }).finally(() => {
      dispatch(invalidateHubPosts());
      dispatch(hideModal());
    });
  }, [navigate, dispatch]);
  
  return (
    <Box>
      <Heading size="lg" mb="6">
        Create note
      </Heading>
      <NoteMediaCards onCreate={handleCreateNote} />
      <CreateNoteModal onCreate={handleCreateNote} />
    </Box>
  );
};
