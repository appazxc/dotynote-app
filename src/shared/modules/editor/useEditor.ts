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
    onCreate: ({ editor }) => {
      editor.view.dom.setAttribute('spellcheck', 'false');
      editor.view.dom.setAttribute('autocomplete', 'off');
      editor.view.dom.setAttribute('autocapitalize', 'sentences');
    },
    // onUpdate(props) {
    //   console.log('props.editor.getHTML()', props.editor.getHTML());

    //   this.content = props.editor.getHTML().replace(/<div><\/div>/g, "<br>");

    //   console.log('this.content = ', this.content);

    // },
  }) as Editor;

  return editor;
};
