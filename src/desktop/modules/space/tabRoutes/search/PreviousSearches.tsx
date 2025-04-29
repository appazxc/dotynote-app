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

export const PreviousSearches = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  return (
    <Box>
      <Heading size="lg" mb="4">
        Previous searches
      </Heading>
    </Box>
  );
};
