import React from 'react';

import { Box, IconButton, Portal } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

export const NoteMenu = ({ noteId }) => {
  const tab = useTabContext();
  const { history } = useRouter();

  return (
    noteId
      ? (
        <Portal>
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
              onClick={() => history.back()}
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
