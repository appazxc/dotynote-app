import React from 'react';
import { Box, IconButton, Portal } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNoteMenuRefContext } from 'desktop/modules/app/components/SpaceLayout/NoteMenuRefProvider';

export const NoteMenu = ({ noteId }) => {
  const noteMenuRef = useNoteMenuRefContext();

  return (
    noteId
      ? (
        <Portal containerRef={noteMenuRef}>
          <Box
            borderRadius="md"
            border="1px solid"
            borderColor="gray.6"
            h="8"
            px="2"
            display="flex"
            alignItems="center"
          >
            <IconButton
              size="xs"
              aria-label="Note menu"
              icon={<BsThreeDotsVertical />}
            />
          </Box>
        </Portal>
      )
      : null
  );
};
