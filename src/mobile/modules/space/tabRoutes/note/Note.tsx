import { useParams } from '@tanstack/react-router';
import React from 'react';

import { NoteTab } from 'mobile/modules/noteTab';

export const Note = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });

  return (
    <NoteTab noteId={Number(noteId)} />
  );
});

export default Note;