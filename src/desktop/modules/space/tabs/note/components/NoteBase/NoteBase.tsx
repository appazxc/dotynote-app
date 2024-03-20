import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';
import { debounce } from 'lodash';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { EditorProvider, useEditor } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

import { NoteTitle } from './NoteTitle';

type Props = {
  id: IdentityType,
  isWriteMode: boolean,
  onEditorInit: () => void,
}

export const NoteBase = (props: Props) => {
  const { id, isWriteMode, onEditorInit } = props;
  const note = useAppSelector(state => noteSelector.getById(state, id));
  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote(note.id);

  const { title, content } = note;

  const debouncedUpdateContent = React.useMemo(() => {
    return debounce((content) => {
      mutate({ content });
    }, 2000);
  }, [mutate]);

  const debouncedUpdateTitle = React.useMemo(() => {
    return debounce((title) => {
      mutate({ title });
    }, 2000);
  }, [mutate]);
  
  const editor = useEditor({
    content,
    onUpdate(props) {
      debouncedUpdateContent(props.editor.getJSON());
    },
    onCreate: onEditorInit,
  });
  
  return (
    <EditorProvider editor={editor}>
      <Box
        py="10"
        flexGrow="1"
        display="flex"
        flexDirection="column"
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
    </EditorProvider>
    
  );
};
