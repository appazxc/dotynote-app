import React from 'react';

import { Container } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { NotePostsSettingsTabContent } from 'shared/modules/notePostsSettingsTab/NotePostsSettingsTabContent';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const PostsSettings = React.memo(() => {
  const { noteId } = useParams({ strict: false });

  return (
    <TabLayout defaultSidebar>
      <Container maxW="container.sm" pt="4">
        <NotePostsSettingsTabContent noteId={Number(noteId)} />
      </Container>
    </TabLayout>
  );
});

export default PostsSettings;
