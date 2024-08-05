import React from 'react';

import { Center, Text } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { NoteProviders } from 'shared/modules/space/tabRoutes/note/components/NoteProviders';
import { rwModes } from 'shared/modules/space/tabRoutes/note/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';

import { NoteHeader } from './containers/NoteHeader';
import { NoteTabContent } from './NoteTabContent';

export const Note = () => {
  const { noteId = '' } = useParams({ strict: false });
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  
  invariant(note, 'Missing note');
  
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));

  if (note._isDeleted) {
    return (
      <Center h="full">
        <Text color="gray.500">
          Note is deleted.
        </Text>
      </Center>
    );
  }
  
  return (
    <NoteProviders
      key={note.id}
      id={note.id}
      isWriteMode={rwMode === rwModes.WRITE}
    >
      <TabLayout 
        header={<NoteHeader noteId={note.id} />} 
        footer={(
          <FooterNavigation
            noteId={note.id}
          />
        )}
      >
        <NoteTabContent noteId={note.id} />
      </TabLayout>
    </NoteProviders>
  );
};

export default Note;