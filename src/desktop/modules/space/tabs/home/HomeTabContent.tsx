import React from 'react';

import {
  Box,
  Container,
  Input,
} from '@chakra-ui/react';
import qs from 'qs';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useDebounceCallback } from 'usehooks-ts';

import { SEARCH } from 'shared/constants/queryKeys';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteCreate } from './NoteCreate';
import { NoteSearch } from './NoteSearch';

export const HomeTabContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { search = '' } = Object.fromEntries(searchParams.entries()); 
  const [value, setValue] = React.useState(search);

  const debouncedNavigate = useDebounceCallback((value) => {
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), search: value }, { replace: true });
  }, 500);

  const handleChange = (event) => {
    setValue(event.target.value);
    debouncedNavigate(event.target.value);
  };

  const handleCreateNote = React.useCallback((id: string) => {
    navigate(buildTabUrl({
      routeName: tabRouteNames.note,
      pathParams: {
        noteId: id,
      },
    }), { replace: true });
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
};