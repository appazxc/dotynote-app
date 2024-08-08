import React from 'react';

import { Box, Center, IconButton, Spinner, Tooltip } from '@chakra-ui/react';
import { GoInfo } from 'react-icons/go';

import { NoteMenu } from 'shared/modules/tabRoutes/note/components/NoteMenu';
import { useIsNoteMutating } from 'shared/modules/tabRoutes/note/hooks/useIsNoteMutating';
import { useNoteMutationError } from 'shared/modules/tabRoutes/note/hooks/useNoteMutationError';

export const SidebarFooter = ({ id }) => {
  const isMutating = useIsNoteMutating(id);
  const error = useNoteMutationError(id);
  
  const errorTooltip = React.useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <Tooltip
        label={error}
        openDelay={300}
        placement="right"
        backgroundColor="orange"
        hasArrow
      >
        <IconButton
          aria-label="Info"
          variant="flat"
          color="orange"
          icon={<GoInfo size="18" />}
        />
      </Tooltip>
    );
  }, [error]);
  
  const content = React.useMemo(() => {
    if (isMutating) {
      return (
        <Center h="32px" w="32px">
          <Spinner size="sm" />
        </Center>
      );
    }

    if (errorTooltip) {
      return errorTooltip;
    }

    return <NoteMenu noteId={id} place="noteDesktopFooter" />;
  }, [id, isMutating, errorTooltip]);

  return (
    <Box
      flexDirection="column"
      gap="2"
      display="flex"
      alignItems="center"
      py="2"
    >
      {content}
    </Box>
  );
};
