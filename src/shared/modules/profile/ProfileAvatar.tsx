import React from 'react';

import { Center, useColorModeValue } from '@chakra-ui/react';
import { FaRegUser } from 'react-icons/fa6';

type Props = {};

export const ProfileAvatar = React.memo((props: Props) => {
  const bg = useColorModeValue('gray.100', 'blackAlpha.300');

  return (
    <Center
      borderRadius="full"
      w="120px"
      h="120px"
      bg={bg}
    >
      <FaRegUser size="30" />
    </Center>
  );
});
