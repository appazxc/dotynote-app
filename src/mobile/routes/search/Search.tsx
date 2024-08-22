import React from 'react';

import { Container } from '@chakra-ui/react';
import { useSearch } from '@tanstack/react-router';

import { NoteInPost } from 'shared/components/NoteInPost';
import { SearchInput } from 'shared/modules/search/SearchInput';
import { SearchResults } from 'shared/modules/search/SearchResults';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';

export const Search = React.memo(() => {
  const { search = '' } = useSearch({ strict: false }); 

  const showSearch = search.length >= 2;

  const renderNote = (id: number) => {
    return (
      <MobileTabLink
        key={id}
        to="/n/$noteId"
        params={{ noteId: String(id) }}
        replace
      >
        <NoteInPost noteId={id} />
      </MobileTabLink>
    );
  };
  
  return (
    <Layout 
      header={(
        <LayoutHeader>
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