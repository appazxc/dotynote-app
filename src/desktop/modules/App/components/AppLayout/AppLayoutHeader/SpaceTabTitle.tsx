import { Box, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { appRouteNames } from 'desktop/modules/app/constants/appRouteNames';
import { getRouteMatch } from 'desktop/modules/app/helpers/getRouteMatch';
import React from 'react';
import api from 'shared/api';
import { noteSelector } from 'shared/selectors';
import { useAppSelector } from 'shared/store/hooks';

export const SpaceTabTitle = ({ path }) => {
  const match = React.useMemo(() => {
    return getRouteMatch(path);
  }, [path]);
  const isNote = match?.route.name === appRouteNames.note;
  const noteId = match?.pathMatch.params.noteId;
  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  const { isLoading } = useQuery({
    queryKey: ['notes', noteId],
    queryFn: () => {
      console.log('load note');

      return api.loadNote(noteId as string);
    },
    enabled: !!noteId && !note,
  });

  const title = React.useMemo(() => {
    if (isNote && !note && isLoading) {
      return 'Loading...';
    }

    if (note) {
      return note.title;
    }

    return match?.route.title || '';
  }, [match, isNote, isLoading, note]);

  return (
    <Box display="flex">{title}</Box>
  );
};
