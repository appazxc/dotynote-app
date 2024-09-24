import { JSONContent } from '@tiptap/core';

import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

export type ApiNoteEntity = BaseEntity<{
  title?: string,
  content?: JSONContent,
  authorId: string,
  access: 'private' | 'public',
  postsSettings: string,
  settings?: string,
  permissions: {
    read: boolean,
    update: boolean,
    delete: boolean,
    stick: boolean,
    stickHere: boolean,
    stickConcreteHere: boolean,
    moveHere: boolean,
    moveConcreteHere: boolean,
  }
}, number>

export type NoteEntity = MergeEntity<ApiNoteEntity, { 
  settings?: NoteSettingsEntity,
  postsSettings?: PostsSettingsEntity,
}>