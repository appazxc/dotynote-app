import React from 'react';

import { Container } from '@chakra-ui/react';
import { useLocation, useNavigate, useSearch } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { NoteInPost } from 'shared/components/NoteInPost';
import { SearchInput } from 'shared/modules/search/SearchInput';
import { SearchResults } from 'shared/modules/search/SearchResults';
import { useAppDispatch } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';

export const Search = React.memo(() => {
  const { search = '' } = useSearch({ strict: false }); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showSearch = search.length >= 2;

  const renderNote = (id: number) => {
    return (
      <NoteInPost
        key={id}
        noteId={id}
        onClick={() => {
          dispatch(openTab({ 
            route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(id) } }),
            makeActive: true,
          }));
          navigate({ to: '/app' });
        }}
      />
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