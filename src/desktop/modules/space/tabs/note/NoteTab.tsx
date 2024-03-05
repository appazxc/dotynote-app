import React from 'react';

import { useParams } from 'react-router';

import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { selectUserId } from 'shared/store/slices/authSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { RwMode, rwModes } from './constants';
import { NoteSidebar } from './containers/NoteSidebar';
import { getInitialRwMode } from './helpers/getInitialRwMode';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = () => {
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
      leftSide={(
        <NoteSidebar
          id={note.id}
          rwMode={rwMode}
          toggleRwMode={handleToggleRwMode}
        />
      )}
    >
      <NoteTabContent noteId={note.id} isWriteMode={rwMode === rwModes.WRITE} />
    </TabLayout>
  );
};
