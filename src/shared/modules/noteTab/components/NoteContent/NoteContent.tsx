import { Box } from '@chakra-ui/react';
import { JSONContent } from '@tiptap/core';
import debounce from 'lodash/debounce';
import React from 'react';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { NoteFiles } from 'shared/components/NoteFiles';
import { NoteImages } from 'shared/components/NoteImages';
import { Tag } from 'shared/components/ui/tag';
import { NoteContentDots } from 'shared/modules/noteTab/components/NoteContent/NoteContentDots';
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

const EMPTY_TEXT_CONTENT = JSON.stringify({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});

const getIsTextContentEmpty = (content: JSONContent) => {
  return JSON.stringify(content) === EMPTY_TEXT_CONTENT;
};

export const NoteContent = (props: Props) => {
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

  const isTextContentEmpty = !content || getIsTextContentEmpty(content);

  const showContent = 
    isWriteMode 
    || !isTextContentEmpty
    || note.images.length
    || note.dots.length;

  if (!showContent) {
    return null;
  }

  return (
    <Box
      flexGrow={isWriteMode ? '1' : undefined}
      display="flex"
      flexDirection="column"
      gap="4"
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
        title={title}
        isWriteMode={isWriteMode}
        onChange={debouncedUpdateTitle}
      />
      <NoteEditorBase
        key={noteId}
        noteId={noteId}
        isMobile={isMobile}
        isWriteMode={isWriteMode}
        isTextContentEmpty={isTextContentEmpty}
        content={content}
      />
      <NoteImages
        noteId={noteId}
        images={note.images}
        hasControls={note.permissions.update}
      />
      <NoteFiles 
        noteId={noteId}
        files={note.files}
      />
      <NoteContentDots
        dots={note.dots}
        showAmount={note.access === 'public'}
      />
    </Box>
  );
};
