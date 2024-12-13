import {
  Box,
  Heading,
} from '@chakra-ui/react';

import { NoteMediaCards } from 'shared/components/NoteMediaCards';

export const NoteCreate = () => {
  return (
    <Box>
      <Heading size="lg" mb="6">
        Create note
      </Heading>
      <NoteMediaCards />
    </Box>
  );
};
