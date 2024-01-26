import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import { mergeAttributes } from "@tiptap/react";

export const extensions = [
  Document,
  History,
  Placeholder.configure({
    placeholder: "Note",
  }),
  Paragraph.extend({
    parseHTML() {
      return [{ tag: "div" }];
    },
    renderHTML({ HTMLAttributes }) {
      return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
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
  BulletList,
  ListItem,
];
