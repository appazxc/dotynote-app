import { VStack } from '@chakra-ui/react';
import React from 'react';

import { useOrderBy } from 'shared/api/hooks/useOrderBy';
import { useUpdatePostsSettings } from 'shared/api/hooks/useUpdatePostsSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { SortSettings } from 'shared/modules/notePostsSettingsTab/SortSettings';
import { noteSelector, orderBySelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
};

export const NotePostsSettingsTabContent = React.memo(({ noteId }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const { data: orderByIds } = useOrderBy();
  
  const postsSettings = note?.postsSettings;
  
  invariant(note, 'Note is missing');
  invariant(postsSettings, 'Missing postsSettings');
  invariant(orderByIds, 'Missing orderByIds');

  const orderBy = useAppSelector(state => orderBySelector.getByIds(state, orderByIds));
  const { mutate } = useUpdatePostsSettings(noteId, postsSettings.id);

  const handleInternalChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    mutate({ internal: event.target.checked });
  }, [mutate]);

  return (
    <VStack gap={4} alignItems="stretch">
      <SwitchSection
        label={`Internal posts are ${note.postsSettings?.internal ? 'visible' : 'hidden'}`}
        description="Show or hide internal posts content and settings"
        isChecked={!!note.postsSettings?.internal}
        onChange={handleInternalChange}
      />
      <SortSettings orderBy={orderBy} postsSettings={postsSettings} />
    </VStack>
  );
});
