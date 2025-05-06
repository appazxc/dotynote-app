import { Container } from '@chakra-ui/react';
import { useNavigate, useParams } from '@tanstack/react-router';
import React from 'react';

import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { PinnedPostsTabContent } from 'shared/modules/pinnedPostsTab/PinnedPostsTabContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

export const PinnedPosts = React.memo(() => {
  const { noteId } = useParams({ strict: false });
  const navigate = useNavigate();

  const handlePostClick = React.useCallback((_event: React.MouseEvent<HTMLDivElement>, id: number) => {
    navigate({ to: noteRoutePath, params: { noteId: id }, search: { parent: noteId } });
  }, [navigate, noteId]);

  return (
    <Layout header={<LayoutHeader showBackButton title="Pinned posts" />}>
      <Container pt="4">
        <PinnedPostsTabContent noteId={Number(noteId)} onPostClick={handlePostClick} />
      </Container>
    </Layout>
  );
});

export default PinnedPosts;
