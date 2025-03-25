import { Stack } from '@chakra-ui/react';
import React from 'react';

import { useUpdateUserSettings } from 'shared/api/hooks/useUpdateUserSettings';
import { SwitchSection } from 'shared/components/ui/switch-section';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {};

export const UserSettings = React.memo((props: Props) => {
  const user = useAppSelector(selectUser);

  invariant(user?.settings, 'Missing userSettings');

  const { deleteEmptyNotes, autoPlayNextAudio } = user.settings;
  const { mutate } = useUpdateUserSettings();

  const handleDisplayChange = React.useCallback(({ checked }) => {
    mutate({
      deleteEmptyNotes: checked,
    });
  }, [mutate]);

  const handleAutoPlayChange = React.useCallback(({ checked }) => {
    mutate({
      autoPlayNextAudio: checked,
    });
  }, [mutate]);
  
  return (
    <Stack gap="6">
      <SwitchSection
        label="Delete empty notes"
        description="Automatically delete notes without content"
        checked={deleteEmptyNotes}
        onCheckedChange={handleDisplayChange}
      />

      <SwitchSection 
        label="Auto-play next audio"
        // eslint-disable-next-line max-len
        description="When enabled, the next audio will play automatically after the current one ends"
        checked={autoPlayNextAudio}
        onCheckedChange={handleAutoPlayChange}
      />
    </Stack>
  );
});
