import { Box, Center, IconButton, Spinner } from '@chakra-ui/react';
import React from 'react';

import { InfoIcon } from 'shared/components/ui/icons';
import { Tooltip } from 'shared/components/ui/tooltip';
import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';
import { useNoteMutationError } from 'shared/modules/noteTab/hooks/useNoteMutationError';

type Props = {
  noteId: string;
}

export const SidebarFooter = ({ noteId }: Props) => {
  const isMutating = useIsNoteMutating(noteId);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const mutationError = useNoteMutationError(noteId);

  React.useEffect(() => {
    if (isMutating) {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 300);

      return () => clearTimeout(timer);
    }

    setShowSpinner(false);
  }, [isMutating]);

  const renderedError = React.useMemo(() => {
    if (!mutationError) {
      return null;
    }

    return (
      <Tooltip
        key={mutationError}
        content={`Save error: ${mutationError}`}
        openDelay={1000}
        positioning={{ placement: 'right' }}
      >
        <IconButton
          aria-label={mutationError}
          size="xs"
          colorPalette="red"
          variant="subtle"
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
    );
  }, [mutationError]);

  const content = React.useMemo(() => {
    if (showSpinner) {
      return (
        <Center h="32px" w="32px">
          <Spinner size="sm" />
        </Center>
      );
    }

    return <NoteMenu noteId={noteId} />;
  }, [noteId, showSpinner]);

  return (
    <Box
      flexDirection="column"
      gap="2"
      display="flex"
      alignItems="center"
      py="2"
    >
      {renderedError}
      {content}
    </Box>
  );
};
