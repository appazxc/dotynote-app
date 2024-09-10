import { JSONContent } from '@tiptap/core';

import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

type MergeEntity<T, K> = Omit<T, keyof K> & K;

export type ApiNoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: string,
  access: 'private' | 'public',
  postsSettings: string,
  settings?: string,
}, number>

export type NoteEntity = MergeEntity<ApiNoteEntity, { 
  settings?: NoteSettingsEntity,
  postsSettings?: PostsSettingsEntity,
}>