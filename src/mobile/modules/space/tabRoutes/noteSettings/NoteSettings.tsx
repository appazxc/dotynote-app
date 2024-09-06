import React from 'react';

import { useParams } from '@tanstack/react-router';

import { NoteSettings } from 'mobile/modules/noteTab';

export const Note = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });

  return (
    <NoteSettings noteId={Number(noteId)} />
  );
});

export default Note;