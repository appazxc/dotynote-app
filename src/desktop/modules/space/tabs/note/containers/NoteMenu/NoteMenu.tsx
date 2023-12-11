import React from 'react';

import { Box, IconButton, Portal } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { useNavigate } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { useNoteMenuRefContext } from 'desktop/modules/space/components/SpaceLayout/SpaceMenuRefProvider';

export const NoteMenu = ({ noteId }) => {
  const noteMenuRef = useNoteMenuRefContext();
  const navigate = useNavigate();
  const tab = useTabContext();

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
            gap="2"
            display="flex"
            alignItems="center"
          >
            <IconButton
              size="xs"
              aria-label="Note back"
              icon={<BsArrowLeft />}
              onClick={() => navigate(-1)}
              isDisabled={tab.routes.length <= 1}
            />
            <IconButton
              size="xs"
              aria-label="Note menu"
              icon={<PiDotsSixVerticalBold />}
            />
          </Box>
        </Portal>
      )
      : null
  );
};
