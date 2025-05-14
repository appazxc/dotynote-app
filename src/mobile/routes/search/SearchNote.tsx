import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { Post } from 'shared/components/Post/Post';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { buildNoteTabPath } from 'shared/util/buildNoteTabPath';
import { invariant } from 'shared/util/invariant';

import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';

type Props = {
  noteId: string;
};

export const SearchNote = React.memo(({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const getNoteById = React.useMemo(() => noteSelector.makeGetEntityById(), []);
  const note = useAppSelector(state => getNoteById(state, noteId));
  const navigate = useNavigate();
  
  invariant(note, 'Missing note');

  return (
    <Post
      noteId={noteId}
      note={note}
      onClick={() => {
        dispatch(openTab({ 
          path: buildNoteTabPath(noteId),
          active: true,
        }));
        navigate({ to: '/app' });
      }}
    />
  );
});
