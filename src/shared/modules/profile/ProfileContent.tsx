import { VStack } from '@chakra-ui/react';
import React from 'react';

import { AccountDeletion } from 'shared/modules/profile/AccountDeletion';
import { PersonalDetails } from 'shared/modules/profile/PersonalDetails';
// import { ProfileAvatar } from 'shared/modules/profile/ProfileAvatar';
// import { UserSummary } from 'shared/modules/profile/UserSummary';

type Props = {};

export const ProfileContent = React.memo((_props: Props) => {
  return (
    <VStack gap="4" alignItems="stretch">
      {/* <ProfileAvatar />
      <UserSummary /> */}
      <PersonalDetails />
      <AccountDeletion />
    </VStack>
  );
});
