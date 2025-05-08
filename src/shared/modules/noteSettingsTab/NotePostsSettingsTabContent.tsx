import { Center, VStack } from '@chakra-ui/react';
import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { Button } from 'shared/components/ui/button';
import { CheckboxCard } from 'shared/components/ui/checkbox-card';
import { ListSettings } from 'shared/modules/noteSettingsTab/ListSettings';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
};

export const NotePostsSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  
  const postsSettings = note?.postsSettings;
  
  invariant(note, 'Note is missing');

  if (!postsSettings) {
    return <NotePostsNoSettings noteId={noteId} />;
  }

  return <NotePostsSettings noteId={noteId} />;
});

const NotePostsNoSettings = React.memo(({ noteId }: Props) => {
  const { mutateAsync: createPostsSettings, isPending } = useCreatePostsSettings(noteId);

  return (
    <Center h="200px">
      <Button
        variant="subtle"
        loading={isPending}
        onClick={() => createPostsSettings({})}
      >
        Create settings
      </Button>
    </Center>
  );
});

const NotePostsSettings = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  
  const postsSettings = note?.postsSettings;
  
  invariant(note, 'Note is missing');
  invariant(postsSettings, 'Missing postsSettings');

  const { mutate } = useUpdatePostsSettings(noteId, postsSettings.id);

  const handleInternalChange = React.useCallback(({ checked }) => {
    mutate({ internal: checked });
  }, [mutate]);

  return (
    <VStack gap={4} alignItems="stretch">
      <ListSettings postsSettings={postsSettings} />
      <CheckboxCard
        label="Show internal posts"
        description="Show or hide internal posts content and settings"
        checked={!!note.postsSettings?.internal}
        onCheckedChange={handleInternalChange}
      />
    </VStack>
  );
});
