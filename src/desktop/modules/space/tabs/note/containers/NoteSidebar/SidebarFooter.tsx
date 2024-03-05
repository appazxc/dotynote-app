import React from 'react';

import { Box, Spinner } from '@chakra-ui/react';
import { useIsMutating } from '@tanstack/react-query';

import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';

export const SidebarFooter = ({ id }) => {
  const isMutatingNotes = useIsMutating({ mutationKey: updateNoteMutationKey(id) });

  return (
    <Box
      flexDirection="column"
      gap="2"
      display="flex"
      alignItems="center"
      py="2"
    >
      {!!isMutatingNotes && <Spinner size="sm" />}
    </Box>
  );
};
