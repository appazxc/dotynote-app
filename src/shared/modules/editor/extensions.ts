import { Highlight } from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import { Selection, Placeholder } from '@tiptap/extensions';
import { StarterKit } from '@tiptap/starter-kit';

import { HorizontalRule } from 'shared/components/TiptapNode/HorizontalRuleNode/HorizontalRuleNodeExtension';
import { ImageUploadNode } from 'shared/components/TiptapNode/ImageUploadNode/ImageUploadNodeExtension';
import { handleImageUpload, MAX_FILE_SIZE } from 'shared/lib/tiptap-utils';

import 'shared/components/TiptapNode/BlockquoteNode/BlockquoteNode.scss';
import 'shared/components/TiptapNode/CodeBlockNode/CodeBlockNode.scss';
import 'shared/components/TiptapNode/HeadingNode/HeadingNode.scss';
import 'shared/components/TiptapNode/HorizontalRuleNode/HorizontalRuleNode.scss';
import 'shared/components/TiptapNode/ImageNode/ImageNode.scss';
import 'shared/components/TiptapNode/ListNode/ListNode.scss';
import 'shared/components/TiptapNode/ParagraphNode/ParagraphNode.scss';
import 'shared/modules/editor/styles/_keyframe-animations.scss';
import 'shared/modules/editor/styles/_variables.scss';

export const extensions = [
  StarterKit.configure({
    paragraph: false,
    horizontalRule: false,
    link: {
      openOnClick: false,
      enableClickSelection: true,
    },
  }),
  Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
      return ['div', { ...HTMLAttributes, class: 'para' }, 0];
    },
  }),
  Placeholder.configure({
    placeholder: 'Note',
  }),
  HorizontalRule,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  Selection,
  ImageUploadNode.configure({
    accept: 'image/*',
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => console.error('Upload failed:', error),
  }),
];
