import { useTiptapEditor } from 'shared/hooks/useTiptapEditor';
import { EditorContent } from 'shared/modules/editor';

export const NoteEditor = () => {
  const { editor } = useTiptapEditor();

  if (!editor) {
    return null;
  }

  return (
    <EditorContent editor={editor} />
  );
};
