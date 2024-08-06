import React from 'react';

import { Box, Text } from '@chakra-ui/react';

import { NoteContentCards } from 'shared/modules/space/tabRoutes/note/components/NoteContentCards';

type Props = {};

export const NoteCreate = React.memo((props: Props) => {
  return (
    <Box>
      <Text fontWeight="500" mb="4">Create note</Text>
      <NoteContentCards isMobile />
    </Box>
  );
});
