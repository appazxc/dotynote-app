import { Center, Text, Tabs } from '@chakra-ui/react';
import React from 'react';

import { apos } from 'shared/constants/htmlCodes';
import { NoteContentPicker } from 'shared/modules/noteTab/components/ContentPicker/NoteContentPicker';
import { PostsContentPicker } from 'shared/modules/noteTab/components/ContentPicker/PostsContentPicker';
import { addTo, AddTo } from 'shared/modules/noteTab/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectAddTo } from 'shared/selectors/user/selectAddTo';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateAddTo } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number;
  canAddToNote: boolean;
  canAddToPosts: boolean;
  onClose: () => void;
};

export const ContentPicker = React.memo(({ noteId, onClose, canAddToNote, canAddToPosts }: Props) => {
  const dispatch = useAppDispatch();
  const addToState = useAppSelector(state => selectAddTo(state, { noteId }));
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  if (!addToState) {
    return (
      <Center>
        <Text>Can{apos}t add any content</Text>
      </Center>
    );
  }

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

      {canAddToNote && (
        <Tabs.Content value={addTo.NOTE}>
          <NoteContentPicker noteId={noteId} onClick={onClose} />
        </Tabs.Content>
      )}
      {canAddToPosts && (
        <Tabs.Content value={addTo.POSTS}>
          <PostsContentPicker
            note={note}
            onClick={onClose}
          />
        </Tabs.Content>
      )}
    </Tabs.Root>
  );
});
