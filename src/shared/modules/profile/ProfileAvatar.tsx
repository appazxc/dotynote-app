import React from 'react';

import { Center } from '@chakra-ui/react';
import { FaRegUser } from 'react-icons/fa6';

type Props = {};

export const ProfileAvatar = React.memo((props: Props) => {
  return (
    <Center
      borderRadius="full"
      w="120px"
      h="120px"
      bg="gray.100"
    >
      <FaRegUser size="30" />
    </Center>
  );
});
