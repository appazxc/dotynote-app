import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getTabInfo } from 'desktop/modules/space/helpers/tabHelpers';
import React from 'react';
import api from 'shared/api';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

export const SpaceTabTitle = React.memo(({ path }) => {
  const { match, isNoteTab, noteId } = React.useMemo(() => {
    return getTabInfo(path);
  }, [path]);

  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  const { isLoading } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => {
      return api.loadNote(noteId as string);
    },
    enabled: !!noteId && !note,
  });

  const title = React.useMemo(() => {
    if (isNoteTab && !note && isLoading) {
      return 'Loading...';
    }

    if (note) {
      return note.title;
    }

    return match?.route.title || 'New Tab';
  }, [match, isNoteTab, isLoading, note]);

  return (
    <Box display="block" overflow="hidden">{title}</Box>
  );
});
