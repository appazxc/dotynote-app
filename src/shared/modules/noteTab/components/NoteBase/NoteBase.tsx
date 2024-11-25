import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import React from 'react';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { Dots } from 'shared/components/Dots';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

import { NoteTitle } from './NoteTitle';

type Props = {
  id: number,
  isWriteMode: boolean,
  isMobile?: boolean,
}

export const NoteBase = (props: Props) => {
  const { id, isWriteMode, isMobile } = props;
  const note = useAppSelector(state => noteSelector.getEntityById(state, id));

  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote();

  const { title, content } = note;

  const debouncedUpdateTitle = React.useMemo(() => {
    return debounce((title) => {
      mutate({ id, data: { title } });
    }, 2000);
  }, [mutate, id]);

  return (
    <Box
      flexGrow="1"
      display="flex"
      flexDirection="column"
      pb="5"
    >
      <NoteTitle
        isMobile={isMobile}
        title={title}
        isWriteMode={isWriteMode}
        onChange={debouncedUpdateTitle}
      />
      <NoteEditorBase
        key={id}
        id={id}
        isMobile={isMobile}
        isWriteMode={isWriteMode}
        content={content}
      />
      <Dots
        placement="note"
        dots={note.dots}
        showAmount={note.access === 'public'}
      />
    </Box>
  );
};
