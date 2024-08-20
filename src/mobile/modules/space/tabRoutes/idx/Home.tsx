import React from 'react';

import { Container } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { NoteInPost } from 'shared/components/NoteInPost';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { HomeNoteSearch } from 'shared/modules/tabRoutes/idx/HomeNoteSearch';
import { HomeSearchInput } from 'shared/modules/tabRoutes/idx/HomeSearchInput';

import { Layout } from 'mobile/components/Layout';
import { MobileTabLink } from 'mobile/modules/space/components/MobileTabLink';
import { TabHeader } from 'mobile/modules/space/components/TabHeader';
import { NoteCreate } from 'mobile/modules/space/tabRoutes/idx/NoteCreate';

export const Home = () => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 

  const handleCreateNote = React.useCallback((id: string) => {
    navigate({
      to: '/n/$noteId',
      params: { noteId: id }, 
      replace: true,
    });
  }, [navigate]);

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

  const showSearch = search.length >= 2;
  
  return (
    <Layout 
      header={(
        <TabHeader>
          <HomeSearchInput isMobile />
        </TabHeader>
      )} 
    >
      <Container pt="4">
        {showSearch ? <HomeNoteSearch value={search} renderNote={renderNote} /> : <NoteCreate />}
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </Layout>
  );
};
