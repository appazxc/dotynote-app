import React from 'react';

import { Box } from '@chakra-ui/react';

import { NoteContentCards } from 'shared/modules/noteTab/components/NoteContentCards';

export const NoteCreate = React.memo(() => {
  return (
    <Box>
      <NoteContentCards isMobile />
    </Box>
  );
});
