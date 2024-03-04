import React from 'react';

import { EditorView } from 'shared/modules/editor';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { NoteEditor } from '../NoteEditor';

type Props = {
  id: IdentityType,
  isWriteMode: boolean,
  content: NoteEntity['content']
}

export const NoteEditorBase = (props: Props) => {
  const { isWriteMode, content } = props;

  return (
    isWriteMode ? <NoteEditor content={content} /> : <EditorView content={content} />
  );
};
