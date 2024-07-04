import React from 'react';

import {
  Box,
  Container,
  Input,
} from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { debounce } from 'lodash';

import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteCreate } from './NoteCreate';
import { NoteSearch } from './NoteSearch';

export const Home = React.memo(() => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 
  const [value, setValue] = React.useState(search);

  const debouncedNavigate = React.useMemo(() => debounce((value) => {
    navigate({ search: (prev) => ({ ...prev, search: value }) });
  }, 500), [navigate]);

  const handleChange = React.useCallback((event) => {
    setValue(event.target.value);
    debouncedNavigate(event.target.value);
  }, [debouncedNavigate]);

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: '/n/$noteId',
      params: { noteId: id }, 
      replace: true,
    });
  }, [navigate]);

  const showSearch = search.length >= 2;

  return (
    <TabLayout>
      <Container>
        <Box pb="10" pt="5">
          <Input
            value={value}
            placeholder="Search"
            borderRadius="20"
            onChange={handleChange}
          />
          {showSearch ? <NoteSearch value={search} /> :<NoteCreate />}
        </Box>
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </TabLayout>
  );
});