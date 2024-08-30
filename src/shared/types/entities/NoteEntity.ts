import { JSONContent } from '@tiptap/core';

import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

import { BaseEntity } from './BaseEntity';

export type NoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: string,
  access: 'private' | 'public',
  postsSettingsId?: string,
  postsSettings?: PostsSettingsEntity
}, number>
