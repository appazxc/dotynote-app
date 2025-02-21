import { Box, Text } from '@chakra-ui/react';
import isBoolean from 'lodash/isBoolean';
import React from 'react';

import { DoneIcon } from 'shared/components/ui/icons';

type Props = {
  label: React.ReactNode;
  checked?: boolean;
};

export const MenuLabel = React.memo(({ label, checked }: Props) => {
  const hasCheckbox = isBoolean(checked);

  return (
    <Box display="flex" alignItems="center">
      {hasCheckbox && (
        <Box width="30px">
          {checked && <DoneIcon />}
        </Box>
      )}
      <Text>{label}</Text>
    </Box>
  );
});
