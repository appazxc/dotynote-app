import { Center } from '@chakra-ui/react';
import React from 'react';
import { FiUser } from 'react-icons/fi';

import { useColorModeValue } from 'shared/components/ui/color-mode';

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
