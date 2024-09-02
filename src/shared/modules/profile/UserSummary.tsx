import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import { selectUser } from 'shared/selectors/auth/selectUser';
import { useAppSelector } from 'shared/store/hooks';

type Props = {};

export const UserSummary = React.memo((props: Props) => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Text
        fontSize="2xl"
        fontWeight="700"
        display="inline"
      >
        {user.nickname}
      </Text>
      {user.username && (
        <Text
          display="inline"
          color="gray"
          fontSize="2xl"
          fontWeight="500"
        >
          @{user.username}
        </Text>
      )}
      <Box>
        <Text color="gray" fontSize="sm">{user.email}</Text>
      </Box>
    </Box>
  );
});
