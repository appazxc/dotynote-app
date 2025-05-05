import { JSONContent } from '@tiptap/core';

const EMPTY_TEXT_CONTENT = JSON.stringify({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});

export const getIsNoteContentEmpty = (content?: JSONContent) => {
  return !content || JSON.stringify(content) === EMPTY_TEXT_CONTENT;
};