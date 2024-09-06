import React from 'react';

import { Container } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { NoteSettingsTabContent } from 'shared/modules/noteSettingsTab/NoteSettingsTabContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const Note = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });

  return (
    <Layout header={<LayoutHeader showBackButton title="Note settings" />}>
      <Container>
        <NoteSettingsTabContent noteId={Number(noteId)} />
      </Container>
    </Layout>
  );
});

export default Note;