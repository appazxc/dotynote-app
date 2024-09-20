import React from 'react';

import { Container } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { Post } from 'shared/components/Post';
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
      <Post
        key={id}
        noteId={id}
        onClick={() => {
          dispatch(openTab({ 
            route: buildTabHref({ to: '/n/$noteId', params: { noteId: String(id) } }),
            active: true,
          }));
          navigate({ to: '/app' });
        }}
      />
    );
  };
  
  return (
    <Layout 
      header={(
        <LayoutHeader minH="48px">
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