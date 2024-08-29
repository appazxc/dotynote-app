import React from 'react';

import { Center, useColorModeValue } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';

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
      <FiUser size="40" />
    </Center>
  );
});
