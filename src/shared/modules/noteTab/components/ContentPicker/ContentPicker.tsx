import { Box, Tabs } from '@chakra-ui/react';
import React from 'react';

import { NoteContent } from 'shared/modules/noteTab/components/ContentPicker/NoteContent';
import { PostsContent } from 'shared/modules/noteTab/components/ContentPicker/PostsContent';
import { addTo, AddTo } from 'shared/modules/noteTab/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateAddTo } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
  canAddToNote: boolean,
  canAddToPosts: boolean,
  onFinish: () => void,
};

export const ContentPicker = React.memo(({ noteId, onFinish, canAddToNote, canAddToPosts }: Props) => {
  const dispatch = useAppDispatch();
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  return (
    <Tabs.Root
      lazyMount
      value={addToState}
      size="sm"
      onValueChange={(e) => dispatch(updateAddTo(e.value as AddTo))}
    >
      <Tabs.List>
        {canAddToNote && <Tabs.Trigger value={addTo.NOTE}>Note</Tabs.Trigger>}
        {canAddToPosts && <Tabs.Trigger value={addTo.POSTS}>Posts</Tabs.Trigger>}
      </Tabs.List>

      {canAddToNote && <Tabs.Content value={addTo.NOTE}><NoteContent /></Tabs.Content>}
      {canAddToPosts && (
        <Tabs.Content value={addTo.POSTS}>
          <PostsContent
            note={note}
            onFinish={onFinish}
          />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
});
