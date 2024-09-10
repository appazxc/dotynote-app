import React from 'react';

import { Box } from '@chakra-ui/react';

import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { noteSelector, noteSettingsSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
};

export const NoteSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const noteSettings = useAppSelector(state => noteSettingsSelector.getEntityById(state, note?.settingsId));

  invariant(noteSettings, 'Missing noteSettings');

  const { mutate } = useUpdateNoteSettings(noteId, noteSettings.id);

  const handleDisplayChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

    mutate({
      display: event.target.checked,
    });
  }, [mutate]);
  
  return (
    <Box>
      <SwitchSection
        label="Display"
        description="Show or hide content of the note. Will be visible only posts"
        isChecked={noteSettings.display}
        onChange={handleDisplayChange}
      />
    </Box>
  );
});
