import { Center, VStack } from '@chakra-ui/react';
import React from 'react';

import { useCreatePostsSettings } from 'shared/api/hooks/useCreatePostsSettings';
import { useOrderBy } from 'shared/api/hooks/useOrderBy';
import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { Button } from 'shared/components/ui/button';
import { CheckboxCard } from 'shared/components/ui/checkbox-card';
import { SortSettings } from 'shared/modules/noteSettingsTab/SortSettings';
import { noteSelector, orderBySelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number;
};

export const NotePostsSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const { data: orderByIds } = useOrderBy();
  
  const postsSettings = note?.postsSettings;
  
  invariant(note, 'Note is missing');
  invariant(orderByIds, 'Missing orderByIds');

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
  const { data: orderByIds } = useOrderBy();
  
  const postsSettings = note?.postsSettings;
  
  invariant(note, 'Note is missing');
  invariant(postsSettings, 'Missing postsSettings');
  invariant(orderByIds, 'Missing orderByIds');

  const orderBy = useAppSelector(state => orderBySelector.getByIds(state, orderByIds));
  const { mutate } = useUpdatePostsSettings(noteId, postsSettings.id);

  const handleInternalChange = React.useCallback(({ checked }) => {
    mutate({ internal: checked });
  }, [mutate]);

  return (
    <VStack gap={4} alignItems="stretch">
      <SortSettings orderBy={orderBy} postsSettings={postsSettings} />
      <CheckboxCard
        label="Show internal posts"
        description="Show or hide internal posts content and settings"
        checked={!!note.postsSettings?.internal}
        onCheckedChange={handleInternalChange}
      />
    </VStack>
  );
});
