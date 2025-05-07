import { Box, Center } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { api } from 'shared/api';
import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
import { Button } from 'shared/components/ui/button';
import { CheckboxCard } from 'shared/components/ui/checkbox-card';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
};

export const NoteSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  if (!note?.settings) {
    return <NoteNoSettings noteId={noteId} />;
  }

  return <NoteSettings noteId={noteId} />;
});

const NoteNoSettings = React.memo(({ noteId }: Props) => {
  const { mutateAsync: createNoteSettings, isPending } = useMutation({
    mutationFn: () => {
      return api.post<string>(`/notes/${noteId}/settings`, {});
    },
  });

  return (
    <Center h="200px">
      <Button
        variant="subtle"
        loading={isPending}
        onClick={() => createNoteSettings()}
      >
        Create settings
      </Button>
    </Center>
  );
});

const NoteSettings = React.memo(({ noteId }: Props) => {
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
      <CheckboxCard
        label="Show content"
        description="Show or hide the note's content. If the content is hidden, only posts will be visible."
        checked={!note.settings.hide}
        onCheckedChange={handleDisplayChange}
      />
    </Box>
  );
});
