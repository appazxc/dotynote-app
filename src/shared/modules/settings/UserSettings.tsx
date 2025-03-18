import { Box } from '@chakra-ui/react';
import React from 'react';

import { useUpdateUserSettings } from 'shared/api/hooks/useUpdateUserSettings';
import { SwitchSection } from 'shared/components/SwitchSection';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {};

export const UserSettings = React.memo((props: Props) => {
  const user = useAppSelector(selectUser);

  invariant(user?.settings, 'Missing userSettings');

  const { mutate } = useUpdateUserSettings();

  const handleDisplayChange = React.useCallback(({ checked }) => {
    mutate({
      deleteEmptyNotes: checked,
    });
  }, [mutate]);
  
  return (
    <Box>
      <SwitchSection
        label="Delete empty notes"
        description="Automatically delete notes with no content."
        checked={user.settings.deleteEmptyNotes}
        onChange={handleDisplayChange}
      />
    </Box>
  );
});
