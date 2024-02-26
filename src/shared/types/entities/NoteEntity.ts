import { JSONContent } from '@tiptap/core';

import { BaseEntity } from './BaseEntity';

export type NoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent
}>
