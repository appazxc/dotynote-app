import { Container } from '@chakra-ui/react';
import { useSearch } from '@tanstack/react-router';
import React from 'react';

import { SearchInput } from 'shared/modules/search/SearchInput';
import { SearchResults } from 'shared/modules/search/SearchResults';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { SearchNote } from 'mobile/routes/search/SearchNote';

export const Search = React.memo(() => {
  const { search = '' } = useSearch({ strict: false }); 

  const showSearch = search.length >= 2;

  const renderNote = (id: number) => {
    return (
      <SearchNote
        key={id}
        noteId={id}
      />
    );
  };
  
  return (
    <Layout 
      header={(
        <LayoutHeader minH="56px" px="2">
          <SearchInput isMobile />
        </LayoutHeader>
      )} 
    >
      <Container pt="4" minH="full">
        {showSearch && <SearchResults value={search} renderNote={renderNote} />}
      </Container>
    </Layout>
  );
});

export default Search;