import { Container } from '@chakra-ui/react';
import { useNavigate, useParams } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { PinnedPostsTabContent } from 'shared/modules/pinnedPostsTab/PinnedPostsTabContent';
import { useAppDispatch } from 'shared/store/hooks';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const PinnedPosts = React.memo(() => {
  const { noteId } = useParams({ strict: false });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>, id: string) => {
    if (event.metaKey) {
      dispatch(openTab({ 
        route: buildNoteTabRoute(id, { parent: noteId }),
      }));
    } else {
      navigate({ to: noteRoutePath, params: { noteId: id }, search: { parent: noteId } });
    }
  }, [navigate, dispatch, noteId]);
  
  return (
    <TabLayout defaultSidebar>
      <Container maxW="container.sm" pt="4">
        <PinnedPostsTabContent noteId={noteId} onPostClick={handlePostClick} />
      </Container>
    </TabLayout>
  );
});

export default PinnedPosts;
