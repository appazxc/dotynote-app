import React, { createContext } from 'react';

import { Box, Heading, Stack, useBoolean } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { debounce } from 'lodash';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { useEditor } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

const EditorContext = createContext<Editor | null>(null);

type Props = React.PropsWithChildren<{
  id: IdentityType,
  isWriteMode: boolean,
}>

export const EditorProvider = ({ id, isWriteMode, children }: Props) => {
  const { mutate } = useUpdateNote(id);
  const note = useAppSelector(state => noteSelector.getById(state, id));
  invariant(note, 'Missing note');

  const [editorInitialized, { on }] = useBoolean(!isWriteMode);
  const { content } = note;

  const debouncedUpdateContent = React.useMemo(() => {
    return debounce((content) => {
      mutate({ content });
    }, 2000);
  }, [mutate]);

  const editor = useEditor({
    content,
    onUpdate(props) {
      debouncedUpdateContent(props.editor.getJSON());
    },
    onCreate: on,
  });

  if (!editor || !editorInitialized) {
    return null;
  }
  
  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = React.useContext(EditorContext);
  
  if (context === null) {
    throw new Error('useEditorContext must be within EditorProvider');
  }

  return context;
};