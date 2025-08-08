import { Editor, EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react';

import { extensions } from './extensions';

export const useEditor = (props: Partial<EditorOptions> = {}) => {
  const editor = useTiptapEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        spellcheck: 'false',
        autocapitalize: 'sentences',
        'aria-label': 'Main content area, start typing to enter text.',
      },
    },
    extensions,
    parseOptions: {
      preserveWhitespace: true,
    },
    content: undefined,
    ...props,
  }) as Editor;

  return editor;
};
