import { EditorContext } from '@tiptap/react';
import debounce from 'lodash/debounce';
import React from 'react';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { entityNames } from 'shared/constants/entityNames';
import { useEditor } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { invariant } from 'shared/util/invariant';

type Props = React.PropsWithChildren<{
  id: string;
  isWriteMode: boolean;
}>

export const EditorProvider = ({ id, children }: Props) => {
  const { mutate } = useUpdateNote(id);
  const note = useAppSelector(state => noteSelector.getEntityById(state, id));
  const dispatch = useAppDispatch();

  invariant(note, 'Missing note');

  const { content } = note;

  const debouncedUpdateContent = React.useMemo(() => {
    const updateOnServer = debounce((content) => {
      mutate({ id, data: { content } });
    }, 2000);
    
    return (content) => {
      dispatch(updateEntity({ id, type: entityNames.note, data: { content } }));
      updateOnServer(content);
    };
  }, [mutate, id, dispatch]);

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