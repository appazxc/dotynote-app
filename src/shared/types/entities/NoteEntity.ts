import { JSONContent } from '@tiptap/core';

import { BaseEntity } from './BaseEntity';

export type NoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: string,
  access: 'private' | 'public',
  postsSettingsId?: string,
}, number>
