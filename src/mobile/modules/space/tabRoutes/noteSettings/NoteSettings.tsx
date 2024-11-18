import { Container, Tabs } from '@chakra-ui/react';
import { useParams, useRouter } from '@tanstack/react-router';
import React from 'react';

import { useTabTitle } from 'shared/hooks/useTabTitle';
import { NotePostsSettingsTabContent } from 'shared/modules/noteSettingsTab/NotePostsSettingsTabContent';
import { NoteSettingsTabContent } from 'shared/modules/noteSettingsTab/NoteSettingsTabContent';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const NoteSettings = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });
  const router = useRouter();
  const tab = useTabContext();
  const title = useTabTitle(tab.routes[tab.routes.length - 1], router);

  return (
    <Layout header={<LayoutHeader showBackButton title={title} />}>
      <Container maxW="3xl" pt="1">
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
            <NoteSettingsTabContent noteId={Number(noteId)} />
          </Tabs.Content>
          <Tabs.Content value="posts">
            <NotePostsSettingsTabContent noteId={Number(noteId)} />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Layout>
  );
});

export default NoteSettings;