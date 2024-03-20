import { JSONContent } from '@tiptap/core';

import { BaseEntity, IdentityType } from './BaseEntity';

export type NoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: IdentityType,
  access: 'PRIVATE' | 'PUBLIC',
  postSettingsId?: string,
}>
