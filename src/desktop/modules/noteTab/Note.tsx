import React from 'react';

import { Center, Text } from '@chakra-ui/react';
import { useParams } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';

import { NoteProviders } from 'shared/modules/noteTab/components/NoteProviders';
import { rwModes } from 'shared/modules/noteTab/constants';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { noteSelector } from 'shared/selectors/entities';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { NoteFooter } from 'desktop/modules/noteTab/NoteFooter';
import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteHeader } from './NoteHeader';
import { NoteSidebar } from './NoteSidebar';
import { NoteTabContent } from './NoteTabContent';

export const Note = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const userId = useAppSelector(selectUserId);

  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');

  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));
  const isWriteMode = rwMode === rwModes.WRITE;

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
      id={note.id}
      isWriteMode={isWriteMode}
    >
      <TabLayout
        scrollRestoration={false}
        leftSide={(
          <NoteSidebar
            id={note.id}
            rwMode={rwMode}
            showRwMode={showRwMode}
          />
        )}
        header={(
          <AnimatePresence>
            <NoteHeader isWriteMode={isWriteMode} />
          </AnimatePresence>  
        )}
        footer={(
          <AnimatePresence>
            <NoteFooter />
          </AnimatePresence>  
        )}
      >
        <NoteTabContent
          key={note.id}
          noteId={note.id}
          showPosts={!!note.postSettingsId}
          isWriteMode={isWriteMode}
        />
      </TabLayout>
    </NoteProviders>
  );
});

export default Note;