import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router';

import { canWriteNote } from 'shared/helpers/user/userRights';
import { rwModes } from 'shared/modules/space/tabs/note/constants';
import { noteSelector } from 'shared/selectors/entities';
import { selectCanWriteNote } from 'shared/selectors/user/selectCanWriteNote';
import { selectRwMode } from 'shared/selectors/user/selectRwMode';
import { useAppSelector } from 'shared/store/hooks';
import { selectUserId } from 'shared/store/slices/authSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteHeader } from './components/NoteHeader';
import { NoteProviders } from './components/NoteProviders';
import { NoteSidebar } from './components/NoteSidebar';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = React.memo(() => {
  const { noteId = '' } = useParams();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const userId = useAppSelector(selectUserId);

  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');
  
  const showRwMode = useAppSelector(state => selectCanWriteNote(state, { noteId }));
  const rwMode = useAppSelector(state => selectRwMode(state, { noteId }));

  return (
    <NoteProviders
      key={noteId}
      id={Number(noteId)}
      isWriteMode={rwMode === rwModes.WRITE}
    >
      <TabLayout
        scrollRestoration={false}
        leftSide={(
          <NoteSidebar
            id={Number(noteId)}
            rwMode={rwMode}
            showRwMode={showRwMode}
          />
        )}
        header={(
          <AnimatePresence>
            <NoteHeader />
          </AnimatePresence>  
        )}
      >
        <NoteTabContent
          noteId={Number(noteId)}
          showPosts={!!note.postSettingsId}
          isWriteMode={rwMode === rwModes.WRITE}
        />
      </TabLayout>
    </NoteProviders>
  );
});
