import { Container, Tabs } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';
import React from 'react';

import { NotePostsSettingsTabContent } from 'shared/modules/noteSettingsTab/NotePostsSettingsTabContent';
import { NoteSettingsTabContent } from 'shared/modules/noteSettingsTab/NoteSettingsTabContent';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const NoteSettings = React.memo(() => {
  const { noteId } = useParams({ strict: false });

  return (
    <TabLayout defaultSidebar>
      <Container maxW="xl" pt="4">
        <Tabs.Root
          lazyMount
          unmountOnExit
          defaultValue="note"
        >
          <Tabs.List>
            <Tabs.Trigger value="note">Note</Tabs.Trigger>
            <Tabs.Trigger value="posts">Posts</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="note">
            <NoteSettingsTabContent noteId={noteId} />
          </Tabs.Content>
          <Tabs.Content value="posts">
            <NotePostsSettingsTabContent noteId={noteId} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </TabLayout>
  );
});

export default NoteSettings;
