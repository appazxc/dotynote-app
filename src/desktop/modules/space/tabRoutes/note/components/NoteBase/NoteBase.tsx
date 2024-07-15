import React from 'react';

import { Box } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

import { NoteTitle } from './NoteTitle';

type Props = {
  id: string,
  isWriteMode: boolean,
}

export const NoteBase = (props: Props) => {
  const { id, isWriteMode } = props;
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote(id);

  const { title, content } = note;

  const debouncedUpdateTitle = React.useMemo(() => {
    return debounce((title) => {
      mutate({ title });
    }, 2000);
  }, [mutate]);
  
  return (
    <Box
      flexGrow="1"
      display="flex"
      flexDirection="column"
      pb="5"
    >
      <NoteTitle
        title={title}
        isWriteMode={isWriteMode}
        onChange={debouncedUpdateTitle}
      />
      <NoteEditorBase
        id={id}
        isWriteMode={isWriteMode}
        content={content}
      />
    </Box>
  );
};
