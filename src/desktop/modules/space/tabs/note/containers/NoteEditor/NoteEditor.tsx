import React from 'react';

import { EditorContent, EditorView, useEditor } from 'shared/modules/editor';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  content: NoteEntity['content']
}

export const NoteEditor = (props: Props) => {
  const { content } = props;
  
  const editor = useEditor({
    content,
  });
  
  return (
    <EditorContent editor={editor} />
  );
};
