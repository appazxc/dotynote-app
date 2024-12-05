import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import React from 'react';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { Dots } from 'shared/components/Dots';
import { Tag } from 'shared/components/ui/tag';
import { NoteBaseImages } from 'shared/modules/noteTab/components/NoteBase/NoteBaseImages';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

import { NoteTitle } from './NoteTitle';

type Props = {
  noteId: number,
  isWriteMode: boolean,
  isMobile?: boolean,
  parent?: NoteEntity | null,
  showParent?: boolean,
}

export const NoteBase = (props: Props) => {
  const { noteId, isWriteMode, parent, showParent, isMobile } = props;
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote();

  const { title, content } = note;

  const debouncedUpdateTitle = React.useMemo(() => {
    return debounce((title) => {
      mutate({ id: noteId, data: { title } });
    }, 2000);
  }, [mutate, noteId]);

  return (
    <Box
      flexGrow="1"
      display="flex"
      flexDirection="column"
      pb="5"
    >
      {parent?.title && showParent && (
        <Tag
          size="lg"
          display="inline-flex"
          w="fit-content"
          mb="4"
        >
          {parent?.title}
        </Tag>
      )}
      <NoteTitle
        isMobile={isMobile}
        title={title}
        isWriteMode={isWriteMode}
        onChange={debouncedUpdateTitle}
      />
      <NoteEditorBase
        key={noteId}
        noteId={noteId}
        isMobile={isMobile}
        isWriteMode={isWriteMode}
        content={content}
      />
      <NoteBaseImages noteId={noteId} images={note.images} />
      <Dots
        placement="note"
        dots={note.dots}
        showAmount={note.access === 'public'}
      />
    </Box>
  );
};
