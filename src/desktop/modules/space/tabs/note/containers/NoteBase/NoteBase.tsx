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

type Props = {
  id: IdentityType,
  isWriteMode: boolean,
}

export const NoteBase = (props: Props) => {
  const { id, isWriteMode } = props;
  const note = useAppSelector(state => noteSelector.getById(state, id));
  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote(note.id);

  const { title, content } = note;

  const debouncedSaveContent = React.useMemo(() => {
    return debounce((content) => {
      mutate({ content });
    }, 2000);
  }, [mutate]);
  
  const editor = useEditor({
    content,
    onUpdate(props) {
      debouncedSaveContent(props.editor.getJSON());
    },
  });
  console.log('editor', editor);
  
  return (
    <EditorProvider editor={editor}>
      <Box pt="10" flexGrow="1">
        <Stack gap="4">
          {title && <Heading>{title}</Heading>}
          <NoteEditorBase
            id={id}
            isWriteMode={isWriteMode}
            content={content}
          />
        </Stack>
      </Box>
    </EditorProvider>
    
  );
};
