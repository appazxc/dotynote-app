import React from 'react';

import { VStack } from '@chakra-ui/react';

import { HubSettings } from 'shared/modules/settings/HubSettings';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const SettingsContent = React.memo(() => {
  const user = useAppSelector(selectUser);

  invariant(user?.settings, 'Missing user settings');

  return (
    <VStack gap="4" alignItems="stretch">
      <HubSettings hub={user?.settings?.hub} />
    </VStack>
  );
});
