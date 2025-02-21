import { Container } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';
import React from 'react';

import { PinnedPostsTabContent } from 'shared/modules/pinnedPostsTab/PinnedPostsTabContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const PinnedPosts = React.memo(() => {
  const { noteId } = useParams({ strict: false });

  return (
    <Layout header={<LayoutHeader showBackButton title="Pinned posts" />}>
      <Container pt="4">
        <PinnedPostsTabContent noteId={Number(noteId)} />
      </Container>
    </Layout>
  );
});

export default PinnedPosts;
