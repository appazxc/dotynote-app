import React from 'react';

import { Container } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { NoteSettingsTabContent } from 'shared/modules/noteSettingsTab/NoteSettingsTabContent';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const NoteSettings = React.memo(() => {
  const { noteId } = useParams({ strict: false });

  return (
    <TabLayout defaultSidebar>
      <Container>
        <NoteSettingsTabContent noteId={Number(noteId)} />
      </Container>
    </TabLayout>
  );
});

export default NoteSettings;
