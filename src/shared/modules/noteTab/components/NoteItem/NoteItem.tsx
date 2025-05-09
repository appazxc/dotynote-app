import { Box } from '@chakra-ui/react';
import React from 'react';

import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
};

export const NoteItem = React.memo((props: Props) => {
  const { noteId } = props;
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note', { id: noteId });
  
  return (
    <Box>
      {note.title}
    </Box>
  );
});
