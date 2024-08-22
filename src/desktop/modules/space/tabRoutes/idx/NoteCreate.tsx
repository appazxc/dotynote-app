import {
  Box,
  Heading,
} from '@chakra-ui/react';

import { NoteContentCards } from 'shared/modules/noteTab/components/NoteContentCards';

export const NoteCreate = () => {
  return (
    <Box>
      <Heading size="lg" mb="6">
        Create note
      </Heading>
      <NoteContentCards />
    </Box>
  );
};
