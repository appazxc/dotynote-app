import React from 'react';

import { EntryNoteMedia } from 'shared/modules/entry/EntryNoteMedia';
import { EntryPostsMedia } from 'shared/modules/entry/EntryPostsMedia';
import { addTo } from 'shared/modules/space/tabRoutes/note/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
  createPostModalExtraId: string,
  editPostSettingsModalExtraId: string,
  onFinish: () => void,
};

export const EntryMediaContent = React.memo((props: Props) => {
  const { noteId, onFinish, createPostModalExtraId, editPostSettingsModalExtraId } = props;
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const isNoteContent = addToState === addTo.NOTE;
  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  invariant(note, 'Missing note');

  return (
    isNoteContent 
      ? <EntryNoteMedia /> 
      : (
        <EntryPostsMedia
          note={note}
          onFinish={onFinish}
          createPostModalExtraId={createPostModalExtraId}
          editPostSettingsModalExtraId={editPostSettingsModalExtraId}
        />
      )
  );
});
