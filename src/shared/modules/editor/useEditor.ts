import { Editor, EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react';

import { extensions } from './extensions';

export const useEditor = (props: Partial<EditorOptions> = {}) => {
  const editor = useTiptapEditor({
    extensions,
    parseOptions: {
      preserveWhitespace: true,
    },
    content: undefined,
    ...props,
    // onUpdate(props) {
    //   console.log('props.editor.getHTML()', props.editor.getHTML());

    //   this.content = props.editor.getHTML().replace(/<div><\/div>/g, "<br>");

    //   console.log('this.content = ', this.content);

    // },
  }) as Editor;

  return editor;
};
