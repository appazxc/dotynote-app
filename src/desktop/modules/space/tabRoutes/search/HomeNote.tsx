import React from 'react';

import { Post } from 'shared/components/Post';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { DesktopTabLink } from 'desktop/modules/space/components/DesktopTabLink/DesktopTabLink';

type Props = {
  noteId: string;
};

export const HomeNote = React.memo(({ noteId }: Props) => {
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const note = useAppSelector(state => getNoteById(state, noteId));
  
  invariant(note, 'Missing note');

  return (
    <DesktopTabLink
      to="/n/$noteId"
      params={{ noteId: String(noteId) }}
    >
      <Post
        noteId={noteId}
        note={note}
      />
    </DesktopTabLink>
  );
});
