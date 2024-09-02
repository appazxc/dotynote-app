import { JSONContent } from '@tiptap/core';

import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

export type NoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: string,
  access: 'private' | 'public',
  postsSettingsId?: string,
  postsSettings?: PostsSettingsEntity,
  posts?: PostEntity,
}, number>
