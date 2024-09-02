import React from 'react';

import { Box, Center, IconButton, Spinner, Tooltip } from '@chakra-ui/react';
import { GoInfo } from 'react-icons/go';

import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useNoteMutationError } from 'shared/modules/noteTab/hooks/useNoteMutationError';

export const SidebarFooter = ({ id }) => {
  const isMutating = useIsNoteMutating(id);
  const error = useNoteMutationError(id);
  
  const errorTooltip = React.useMemo(() => {
    if (!error) {
      return null;
    }

    return (
      <Tooltip
        hasArrow
        label={error}
        openDelay={300}
        placement="right"
        backgroundColor="orange"
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

    return <NoteMenu noteId={id} />;
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
