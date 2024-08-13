import React from 'react';

import { Center, Text } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';

import { NoteProviders } from 'shared/modules/tabRoutes/note/components/NoteProviders';
import { rwModes } from 'shared/modules/tabRoutes/note/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { Layout } from 'mobile/components/Layout';
import { NoteFooter } from 'mobile/modules/tabRoutes/note/NoteFooter';

import { NoteHeader } from './NoteHeader';
import { NoteTabContent } from './NoteTabContent';

export const Note = () => {
  const { noteId = '' } = useParams({ strict: false });
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  
  invariant(note, 'Missing note');
  
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const isWriteMode = rwMode === rwModes.WRITE;

  if (note._isDeleted) {
    return (
      <Layout>
        <Center h="full">
          <Text color="gray.500">
            Note is deleted.
          </Text>
        </Center>
      </Layout>
    );
  }
  
  return (
    <NoteProviders
      id={note.id}
      isWriteMode={isWriteMode}
    >
      <Layout 
        header={<NoteHeader noteId={note.id} />} 
        footer={(
          <NoteFooter />
        )}
      >
        <NoteTabContent
          noteId={note.id}
          isWriteMode={isWriteMode}
          showPosts={!!note.postSettingsId}
        />
      </Layout>
    </NoteProviders>
  );
};

export default Note;