import React from 'react';

import { useParams } from 'react-router';

import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { selectUserId } from 'shared/store/slices/authSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteSidebar } from './components/NoteSidebar';
import { RwMode, rwModes } from './constants';
import { getInitialRwMode } from './helpers/getInitialRwMode';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = React.memo(() => {
  const { noteId = '' } = useParams();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const userId = useAppSelector(selectUserId);

  invariant(note, 'Missing note');
  invariant(userId, 'Missing userId');
  
  const [rwMode, setRwMode] = React.useState<RwMode>(getInitialRwMode(note, userId));
  
  const handleToggleRwMode = React.useCallback(() => {
    setRwMode(activeRwMode => activeRwMode === rwModes.READ ? rwModes.WRITE : rwModes.READ);
  }, []);

  return (
    <TabLayout
      key={noteId}
      scrollRestoration={false}
      leftSide={(
        <NoteSidebar
          id={Number(noteId)}
          rwMode={rwMode}
          toggleRwMode={handleToggleRwMode}
        />
      )}
    >
      <NoteTabContent
        noteId={Number(noteId)}
        showPosts={!!note.postSettingsId}
        isWriteMode={rwMode === rwModes.WRITE}
      />
    </TabLayout>
  );
});
