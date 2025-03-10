import { Box, Center, Spinner } from '@chakra-ui/react';
import React from 'react';

import { NoteMenu } from 'shared/modules/noteTab/components/NoteMenu';
import { useIsNoteMutating } from 'shared/modules/noteTab/hooks/useIsNoteMutating';

type Props = {
  noteId: number;
}

export const SidebarFooter = ({ noteId }: Props) => {
  const isMutating = useIsNoteMutating(noteId);
  const [showSpinner, setShowSpinner] = React.useState(false);

  React.useEffect(() => {
    if (isMutating) {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 300);

      return () => clearTimeout(timer);
    }

    setShowSpinner(false);
  }, [isMutating]);
  
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
      {content}
    </Box>
  );
};
