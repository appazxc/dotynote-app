import React from 'react';

import { Box, VStack } from '@chakra-ui/react';

import { PersonalDetails } from 'shared/modules/profile/PersonalDetails';
import { ProfileAvatar } from 'shared/modules/profile/ProfileAvatar';
import { UserSummary } from 'shared/modules/profile/UserSummary';

type Props = {};

export const ProfileContent = React.memo((props: Props) => {
  return (
    <VStack gap="4" alignItems="stretch">
      <ProfileAvatar />
      <UserSummary />
      <PersonalDetails mt="10" />
    </VStack>
  );
});
