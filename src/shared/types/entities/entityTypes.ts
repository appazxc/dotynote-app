import { EntityName, entityNames } from 'shared/constants/entityNames';
import { ApiNoteAudioEntity, NoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';
import { ApiNoteDotEntity, NoteDotEntity } from 'shared/types/entities/NoteDotEntity';
import { ApiNoteEntity, NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiNoteFileEntity, NoteFileEntity } from 'shared/types/entities/NoteFileEntity';
import { ApiNoteImageEntity, NoteImageEntity } from 'shared/types/entities/NoteImageEntity';
import { ApiNoteSettingsEntity, NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { ApiOrderByEntity, OrderByEntity } from 'shared/types/entities/OrderByEntity';
import { ApiPostDotEntity, PostDotEntity } from 'shared/types/entities/PostDotEntity';
import { ApiPostEntity, PostEntity } from 'shared/types/entities/PostEntity';
import { ApiPostInternalEntity, PostInternalEntity } from 'shared/types/entities/PostInternalEntity';
import { ApiPostsSettingsEntity, PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';
import { ApiSpaceEntity, SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { ApiSpaceTabEntity, SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ApiUserEntity, UserEntity } from 'shared/types/entities/UserEntity';
import { ApiUserSettingsEntity, UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

export type ApiEntityTypes = {
  [entityNames.user]: ApiUserEntity,
  [entityNames.space]: ApiSpaceEntity,
  [entityNames.spaceTab]: ApiSpaceTabEntity,
  [entityNames.note]: ApiNoteEntity,
  [entityNames.post]: ApiPostEntity,
  [entityNames.postsSettings]: ApiPostsSettingsEntity,
  [entityNames.noteSettings]: ApiNoteSettingsEntity,
  [entityNames.userSettings]: ApiUserSettingsEntity,
  [entityNames.orderBy]: ApiOrderByEntity,
  [entityNames.postInternal]: ApiPostInternalEntity,
  [entityNames.postDot]: ApiPostDotEntity,
  [entityNames.noteDot]: ApiNoteDotEntity,
  [entityNames.noteImage]: ApiNoteImageEntity,
  [entityNames.noteFile]: ApiNoteFileEntity,
  [entityNames.noteAudio]: ApiNoteAudioEntity,
}

export type ApiEntity = ApiEntityTypes[EntityName]

export type EntityTypes = {
  [entityNames.user]: UserEntity,
  [entityNames.space]: SpaceEntity,
  [entityNames.spaceTab]: SpaceTabEntity,
  [entityNames.note]: NoteEntity,
  [entityNames.post]: PostEntity,
  [entityNames.postsSettings]: PostsSettingsEntity,
  [entityNames.noteSettings]: NoteSettingsEntity,
  [entityNames.userSettings]: UserSettingsEntity,
  [entityNames.orderBy]: OrderByEntity,
  [entityNames.postInternal]: PostInternalEntity,
  [entityNames.postDot]: PostDotEntity,
  [entityNames.noteDot]: NoteDotEntity,
  [entityNames.noteImage]: NoteImageEntity,
  [entityNames.noteFile]: NoteFileEntity,
  [entityNames.noteAudio]: NoteAudioEntity,
}
