import { Box, BoxProps, Text } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { SWContext } from 'shared/core/Providers/SWProvider';
import { useReactContext } from 'shared/util/useReactContext';

type Props = BoxProps;

export const UpdateAvailability = React.memo((props: Props) => {
  const { isUpdateAvailable, updateSW } = useReactContext(SWContext);

  if (!isUpdateAvailable) {
    return null;
  }
  return (
    <Box {...props}>
      <Text color="colorPalette.info" fontSize="sm">New version available</Text>
      <Button
        w="full"
        variant="subtle"
        colorPalette="purple"
        onClick={() => updateSW?.(true)}
      >
        Update
      </Button>
    </Box>
  );
});
