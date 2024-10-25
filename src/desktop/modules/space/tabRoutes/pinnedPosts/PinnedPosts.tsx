import React from 'react';

import { Container } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { PinnedPostsTabContent } from 'shared/modules/pinnedPostsTab/PinnedPostsTabContent';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const PinnedPosts = React.memo(() => {
  const { noteId } = useParams({ strict: false });

  return (
    <TabLayout defaultSidebar>
      <Container maxW="container.sm" pt="4">
        <PinnedPostsTabContent noteId={Number(noteId)} />
      </Container>
    </TabLayout>
  );
});

export default PinnedPosts;
