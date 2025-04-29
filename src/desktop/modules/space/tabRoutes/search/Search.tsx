import {
  Box,
  Container,
} from '@chakra-ui/react';
import { useSearch } from '@tanstack/react-router';
import React from 'react';

import { SearchInput } from 'shared/modules/search/SearchInput';
import { SearchResults } from 'shared/modules/search/SearchResults';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';
import { HomeNote } from 'desktop/modules/space/tabRoutes/search/HomeNote';

import { PreviousSearches } from './PreviousSearches';

const Home = React.memo(() => {
  const { search = '' } = useSearch({ strict: false }); 

  const renderNote = (id: number) => {
    return (
      <HomeNote key={id} noteId={id} />
    );
  };

  const showSearch = search.length >= 2;

  return (
    <TabLayout>
      <Container h="full" maxW="3xl">
        <Box
          flexDirection="column"
          display="flex"
          gap="4"
          position="relative"
          h="full"
        >
          <Box
            position="sticky"
            bg="bg"
            top="0"
            pt="5"
            pb="4"
            zIndex="docked"
          >
            <SearchInput />
          </Box>
          {showSearch ? <SearchResults value={search} renderNote={renderNote} /> : <PreviousSearches />}
        </Box>
      </Container>
    </TabLayout>
  );
});

export default Home;