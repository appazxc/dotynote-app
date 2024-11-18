import { Box } from '@chakra-ui/react';
import React from 'react';

import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
};

export const NoteSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note?.settings, 'Missing noteSettings');

  const { mutate } = useUpdateNoteSettings(noteId, note.settings.id);

  const handleDisplayChange = React.useCallback(({ checked }) => {

    mutate({
      hide: !checked,
    });
  }, [mutate]);
  
  return (
    <Box>
      <SwitchSection
        label={`Content is ${note.settings.hide ? 'hidden' : 'visible'}`}
        description="Show or hide content of the note. Will be visible only posts"
        checked={!note.settings.hide}
        onChange={handleDisplayChange}
      />
    </Box>
  );
});
