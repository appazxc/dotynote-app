import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { useEditor as useTiptapEditor, Editor, mergeAttributes } from "@tiptap/react";

export const useEditor = () => {
  const editor = useTiptapEditor({
    extensions: [
      Document,
      History,
      Paragraph.extend({
        parseHTML() {
          return [{ tag: 'div' }];
        },
        renderHTML({ HTMLAttributes }) {
          return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
        },
      }),
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content: undefined,
  }) as Editor;

  return editor;
};