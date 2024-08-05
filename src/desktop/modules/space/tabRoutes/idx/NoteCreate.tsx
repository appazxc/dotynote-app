import {
  Box,
  Heading,
} from '@chakra-ui/react';

import { NoteContentCards } from 'shared/modules/space/tabRoutes/note/components/NoteContentCards';

export const NoteCreate = () => {
  return (
    <Box mt="10">
      <Heading size="lg" mb="6">
        Create note with:
      </Heading>
      <NoteContentCards />
    </Box>
  );
};
