import React from 'react';

import debounce from 'lodash/debounce';

import { afterNoteUpdated } from 'shared/actions/afterNoteUpdated';
import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { useEditor } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { EditorContext } from './EditorContext';

type Props = React.PropsWithChildren<{
  id: number,
  isWriteMode: boolean,
}>

export const EditorProvider = ({ id, children }: Props) => {
  const { mutateAsync } = useUpdateNote(id);
  const note = useAppSelector(state => noteSelector.getEntityById(state, id));
  const dispatch = useAppDispatch();
  invariant(note, 'Missing note');

  const { content } = note;

  const debouncedUpdateContent = React.useMemo(() => {
    return debounce((content) => {
      mutateAsync({ content }).then(() => {
        dispatch(afterNoteUpdated(id));
      });
    }, 2000);
  }, [mutateAsync, dispatch, id]);

  const editor = useEditor({
    content,
    onUpdate(props) {
      debouncedUpdateContent(props.editor.getJSON());
    },
  });

  React.useEffect(() => {
    if (!editor || !content) {
      return;
    }
    editor.commands.setContent(content);
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