import { Box, Text } from '@chakra-ui/react';
import React from 'react';

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
        fontSize="3xl"
        fontWeight="700"
        lineHeight="1"
      >
        {user.nickname}
      </Text>
      {user.username && (
        <Text
          display="inline"
          color="gray"
          fontSize="sm"
          fontWeight="500"
        >
          @{user.username}
        </Text>
      )}
    </Box>
  );
});
