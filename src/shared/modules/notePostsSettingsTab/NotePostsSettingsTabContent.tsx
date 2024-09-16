import React from 'react';

import { Box } from '@chakra-ui/react';

import { useOrderBy } from 'shared/api/hooks/useOrderBy';
import { useUpdateNoteSettings } from 'shared/api/hooks/useUpdateNoteSettings';
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
  
  invariant(postsSettings, 'Missing postsSettings');
  invariant(orderByIds, 'Missing orderByIds');

  const orderBy = useAppSelector(state => orderBySelector.getByIds(state, orderByIds));
  // const { mutate } = useUpdateNoteSettings(noteId, note.settings.id);
  // const handleDisplayChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {

  //   mutate({
  //     display: event.target.checked,
  //   });
  // }, [mutate]);
  
  return (
    <Box>
      <SortSettings orderBy={orderBy} postsSettings={postsSettings} />
    </Box>
  );
});
