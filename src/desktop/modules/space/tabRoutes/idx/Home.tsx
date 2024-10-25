import React from 'react';

import {
  Box,
  Container,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { invalidateHubPosts } from 'shared/actions/invalidateHubPosts';
import { Post } from 'shared/components/Post';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { SearchInput } from 'shared/modules/search/SearchInput';
import { SearchResults } from 'shared/modules/search/SearchResults';
import { useAppDispatch } from 'shared/store/hooks';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink';
import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteCreate } from './NoteCreate';

export const Home = React.memo(() => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 
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

  const renderNote = (id: number) => {
    return (
      <DesktopTabLink
        key={id}
        to="/n/$noteId"
        params={{ noteId: String(id) }}
      >
        <Post noteId={id} />
      </DesktopTabLink>
    );
  };

  const showSearch = search.length >= 2;

  return (
    <TabLayout>
      <Container h="full">
        <Box
          flexDirection="column"
          display="flex"
          gap="4"
          position="relative"
          h="full"
        >
          <Box
            position="sticky"
            bg="body"
            top="0"
            pt="5"
            pb="4"
          >
            <SearchInput />
          </Box>
          {showSearch ? <SearchResults value={search} renderNote={renderNote} /> : <NoteCreate />}
        </Box>
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </TabLayout>
  );
});