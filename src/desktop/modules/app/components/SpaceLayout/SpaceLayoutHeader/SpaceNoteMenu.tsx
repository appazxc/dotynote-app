import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const SpaceNoteMenu = () => {
  const showNoteMenu = false;

  return (
    showNoteMenu
      ? (
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
      )
      : null
  );
};
