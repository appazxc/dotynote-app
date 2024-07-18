import React from 'react';

import { useParams } from '@tanstack/react-router';
import { AnimatePresence } from 'framer-motion';

import { rwModes } from 'shared/modules/space/tabRoutes/note/constants';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { noteSelector } from 'shared/selectors/entities';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteHeader } from './components/NoteHeader';
import { NoteProviders } from './components/NoteProviders';
import { NoteSidebar } from './components/NoteSidebar';
import { NoteTabContent } from './NoteTabContent';

export const Note = React.memo(() => {
  const { noteId = '' } = useParams({ strict: false });
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const userId = useAppSelector(selectUserId);

  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');

  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));

  return (
    <NoteProviders
      key={noteId}
      id={noteId}
      isWriteMode={rwMode === rwModes.WRITE}
    >
      <TabLayout
        scrollRestoration={false}
        leftSide={(
          <NoteSidebar
            id={noteId}
            rwMode={rwMode}
            showRwMode={showRwMode}
          />
        )}
        header={(
          <AnimatePresence>
            <NoteHeader isWriteMode={rwMode === rwModes.WRITE} />
          </AnimatePresence>  
        )}
      >
        <NoteTabContent
          noteId={noteId}
          showPosts={!!note.postSettingsId}
          isWriteMode={rwMode === rwModes.WRITE}
        />
      </TabLayout>
    </NoteProviders>
  );
});

export default Note;