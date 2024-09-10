import React from 'react';

import { EntryNoteMedia } from 'shared/modules/entry/EntryNoteMedia';
import { EntryPostsMedia } from 'shared/modules/entry/EntryPostsMedia';
import { addTo } from 'shared/modules/noteTab/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
  createPostModalExtraId: string,
  editPostsSettingsModalExtraId: string,
  onFinish: () => void,
};

export const EntryMediaContent = React.memo((props: Props) => {
  const { noteId, onFinish, createPostModalExtraId, editPostsSettingsModalExtraId } = props;
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const isNoteContent = addToState === addTo.NOTE;
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  return (
    isNoteContent 
      ? <EntryNoteMedia /> 
      : (
        <EntryPostsMedia
          note={note}
          createPostModalExtraId={createPostModalExtraId}
          editPostsSettingsModalExtraId={editPostsSettingsModalExtraId}
          onFinish={onFinish}
        />
      )
  );
});
