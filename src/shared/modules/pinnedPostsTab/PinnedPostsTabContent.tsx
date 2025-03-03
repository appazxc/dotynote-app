import { Box, Container } from '@chakra-ui/react';
import React from 'react';

import { PostList } from 'shared/modules/noteTab/components/PostList/PostList';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number;
};

const OPTIONS = { refetchOnMount: 'always' as const };

export const PinnedPostsTabContent = React.memo(({ noteId } : Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  return (
    <Container maxW="2xl">
      <PostList
        isPinned
        noteId={note.id}
        options={OPTIONS}
      />
    </Container>
  );
});
