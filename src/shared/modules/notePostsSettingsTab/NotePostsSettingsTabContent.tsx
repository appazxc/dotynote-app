import React from 'react';

import { Box } from '@chakra-ui/react';

import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
};

export const NotePostsSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  // invariant(note?.settings, 'Missing noteSettings');

  // const { mutate } = useUpdateNoteSettings(noteId, note.settings.id);

  // const handleDisplayChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

  //   mutate({
  //     display: event.target.checked,
  //   });
  // }, [mutate]);
  
  return (
    <Box>
      hmmm
    </Box>
  );
});
