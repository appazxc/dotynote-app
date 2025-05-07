import { Container } from '@chakra-ui/react';
import React from 'react';

import { PostList } from 'shared/modules/noteTab/components/PostList/PostList';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
  onPostClick: (event: React.MouseEvent<HTMLDivElement>, id: string) => void;
};

const OPTIONS = { refetchOnMount: 'always' as const };

export const PinnedPostsTabContent = React.memo(({ noteId, onPostClick } : Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  const handlePostClick = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => (post: PostEntity) => {
    onPostClick(event, post.note.id);
  }, [onPostClick]);

  return (
    <Container maxW="2xl">
      <PostList
        isPinned
        noteId={note.id}
        options={OPTIONS}
        onPostClick={handlePostClick}
      />
    </Container>
  );
});
