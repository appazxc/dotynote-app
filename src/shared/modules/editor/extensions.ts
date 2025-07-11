import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
// backend not supported this esm module
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Underline from '@tiptap/extension-underline';
// import { mergeAttributes } from '@tiptap/react';
// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';
// load all highlight.js languages
// import { common, createLowlight } from 'lowlight';

// const lowlight = createLowlight(common);

// lowlight.register('html', html);
// lowlight.register('css', css);
// lowlight.register('js', js);
// lowlight.register('ts', ts);

export const extensions = [
  Document,
  History,
  Placeholder.configure({
    placeholder: 'Note',
  }),
  // Paragraph.extend({
  //   parseHTML() {
  //     return [{ tag: 'div' }];
  //   },
  //   renderHTML({ HTMLAttributes }) {
  //     return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  //   },
  // }),
  Heading.configure({
    levels: [1, 2, 3],
  }),
  HardBreak,
  Paragraph,
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
  OrderedList,
  ListItem,
  Blockquote,
  CodeBlock,
  // CodeBlockLowlight.configure({
  //   lowlight,
  // }),
];
