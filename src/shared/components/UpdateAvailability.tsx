import { Box, BoxProps, Flex, FlexProps, Text } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { SWContext } from 'shared/core/Providers/SWProvider';
import { useReactContext } from 'shared/util/useReactContext';

type Props = {
  size?: 'sm' | 'md';
} & FlexProps;

export const UpdateAvailability = React.memo(({ size = 'md', ...boxProps }: Props) => {
  const { isUpdateAvailable, updateSW } = useReactContext(SWContext);

  if (!isUpdateAvailable) {
    return null;
  }

  const buttonSize = size === 'sm' ? '2xs' : 'xs';

  return (
    <Flex
      borderRadius="md"
      bg="purple.subtle"
      p="2"
      flexDirection="column"
      gap="2"
      {...boxProps}
    >
      <Text
        fontWeight="bold"
        fontSize="xs"
        color="purple.fg"
      >
        New version available
      </Text>
      <Button
        size={buttonSize}
        colorPalette="purple"
        onClick={() => updateSW?.(true)}
      >
        Update
      </Button>
    </Flex>
  );
});
