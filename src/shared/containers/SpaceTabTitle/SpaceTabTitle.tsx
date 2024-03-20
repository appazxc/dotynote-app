import React from 'react';

import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useNote } from 'shared/api/hooks/useNote';
import { ChakraBox } from 'shared/components/ChakraBox';
import { getTabInfo } from 'shared/modules/space/helpers/tabHelpers';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  path: string;
}

export const SpaceTabTitle = React.memo(({ path }: Props) => {
  const { match, isNoteTab, noteId } = React.useMemo(() => {
    return getTabInfo(path);
  }, [path]);

  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  // const { isLoading } = useQuery({
  //   queryKey: ['notes', noteId],
  //   queryFn: () => {
  //     return api.loadNote(noteId as string);
  //   },
  //   enabled: !!noteId && !note,
  // });

  const { isLoading } = useNote(noteId, { enabled: !!noteId && !note });

  const title = React.useMemo(() => {
    if (isNoteTab && !note && isLoading) {
      return 'Loading...';
    }

    if (note) {
      return note.title || 'Untitled';
    }

    return match?.route.title || 'New Tab';
  }, [match, isNoteTab, isLoading, note]);

  return (
    <Box
      fontSize="sm"
      whiteSpace="nowrap"
    >
      <Box>
        {title}
      </Box>
    </Box>
  );
});
