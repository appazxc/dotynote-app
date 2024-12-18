import debounce from 'lodash/debounce';
import React from 'react';

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
  const { mutate } = useUpdateNote();
  const note = useAppSelector(state => noteSelector.getEntityById(state, id));
  
  invariant(note, 'Missing note');

  const { content } = note;

  const debouncedUpdateContent = React.useMemo(() => {
    return debounce((content) => {
      mutate({ id, data: { content } });
    }, 2000);
  }, [mutate, id]);

  const editor = useEditor({
    content,
    onUpdate(props) {
      debouncedUpdateContent(props.editor.getJSON());
    },
  });

  React.useEffect(() => {
    if (!editor) {
      return;
    }
    editor.commands.setContent(content || '');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!editor) {
    return null;
  }
  
  return (
    <EditorContext.Provider value={{ editor }}>
      {children}
    </EditorContext.Provider>
  );
};