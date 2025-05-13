import { Container } from '@chakra-ui/react';
import React from 'react';

import { StickTypeList } from 'shared/modules/noteTab/components/StickTypeList';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
};

const OPTIONS = { refetchOnMount: 'always' as const };

export const PinnedPostsTabContent = React.memo(({ noteId } : Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  return (
    <Container maxW="2xl">
      <StickTypeList
        isPinned
        noteId={note.id}
        options={OPTIONS}
      />
    </Container>
  );
});
