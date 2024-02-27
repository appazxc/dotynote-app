import React from 'react';

import { Text } from '@chakra-ui/react';

import { useNote } from 'shared/api/hooks/useNote';
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
    <Text
      noOfLines={1}
    >
      {title}
    </Text>
  );
});
