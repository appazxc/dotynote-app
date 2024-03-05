import { EditorContent, useEditorContext } from 'shared/modules/editor';

export const NoteEditor = () => {
  const editor = useEditorContext();

  if (!editor) {
    return null;
  }

  return (
    <EditorContent editor={editor} />
  );
};
