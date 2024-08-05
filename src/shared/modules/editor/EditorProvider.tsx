import React from 'react';

import debounce from 'lodash/debounce';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { useEditor } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { EditorContext } from './EditorContext';

type Props = React.PropsWithChildren<{
  id: number,
  isWriteMode: boolean,
}>

export const EditorProvider = ({ id, children }: Props) => {
  const { mutate } = useUpdateNote(id);
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');

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
  });

  if (!editor) {
    return null;
  }
  
  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
};