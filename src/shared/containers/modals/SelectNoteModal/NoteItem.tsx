import React from 'react';

import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const NoteItem = ({ id }) => {
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');
  
  return (
    <div>{note.id}</div>
  );
};
