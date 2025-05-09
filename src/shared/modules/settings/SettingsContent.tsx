import { VStack } from '@chakra-ui/react';
import React from 'react';

import { UserSettings } from 'shared/modules/settings/UserSettings';
import { selectUser } from 'shared/selectors/user/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const SettingsContent = React.memo(() => {
  const user = useAppSelector(selectUser);

  invariant(user?.settings, 'Missing user settings');

  return (
    <VStack gap="4" alignItems="stretch">
      <UserSettings />
    </VStack>
  );
});
