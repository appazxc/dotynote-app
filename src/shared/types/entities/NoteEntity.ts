import { JSONContent } from '@tiptap/core';

import { BaseEntity } from 'shared/types/entities/BaseEntity';
import { MergeEntity } from 'shared/types/entities/MergeEntity';
import { NoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';
import { NoteFileEntity } from 'shared/types/entities/NoteFileEntity';
import { NoteImageEntity } from 'shared/types/entities/NoteImageEntity';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';

export type ApiNoteEntity = BaseEntity<{
  title?: string;
  content?: JSONContent;
  authorId: string;
  access: 'private' | 'public';
  postsSettings: string;
  settings?: string;
  permissions: {
    read: boolean;
    update: boolean;
    delete: boolean;
    stick: boolean;
    stickHere?: boolean;
    stickConcreteHere?: boolean;
    moveHere?: boolean;
    moveConcreteHere?: boolean;
    createPost?: boolean;
    upsertDot?: boolean;
  };
  dots: string[];
  images: string[];
  files: string[];
  audio: string[];
  videos: string[];
}>

export type NoteEntity = MergeEntity<ApiNoteEntity, { 
  settings?: NoteSettingsEntity;
  postsSettings?: PostsSettingsEntity;
  dots: NoteDotEntity[];
  images: NoteImageEntity[];
  files: NoteFileEntity[];
  audio: NoteAudioEntity[];
  videos: NoteVideoEntity[];
}>