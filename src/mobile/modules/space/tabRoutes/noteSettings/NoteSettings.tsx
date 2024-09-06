import React from 'react';

import { Container } from '@chakra-ui/react';
import { useParams, useRouter } from '@tanstack/react-router';

import { useTabTitle } from 'shared/hooks/useTabTitle';
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
      <Container>
        <NoteSettingsTabContent noteId={Number(noteId)} />
      </Container>
    </Layout>
  );
});

export default NoteSettings;