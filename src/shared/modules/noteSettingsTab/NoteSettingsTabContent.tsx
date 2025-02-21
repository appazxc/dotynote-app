import { Box } from '@chakra-ui/react';
import React from 'react';

import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number;
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
        label="Show content"
        description="Show or hide the note's content. If the content is hidden, only posts will be visible."
        checked={!note.settings.hide}
        onChange={handleDisplayChange}
      />
    </Box>
  );
});
