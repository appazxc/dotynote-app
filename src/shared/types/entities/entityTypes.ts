import { EntityName, entityTypes } from 'shared/constants/entityTypes';
import { ApiNoteEntity, NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiNoteSettingsEntity, NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { ApiOrderByEntity, OrderByEntity } from 'shared/types/entities/OrderByEntity';
import { ApiPostEntity, PostEntity } from 'shared/types/entities/PostEntity';
import { ApiPostsSettingsEntity, PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';
import { ApiSpaceEntity, SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { ApiSpaceTabEntity, SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ApiUserEntity, UserEntity } from 'shared/types/entities/UserEntity';
import { ApiUserSettingsEntity, UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

export type ApiEntityTypes = {
  [entityTypes.user]: ApiUserEntity,
  [entityTypes.space]: ApiSpaceEntity,
  [entityTypes.spaceTab]: ApiSpaceTabEntity,
  [entityTypes.note]: ApiNoteEntity,
  [entityTypes.post]: ApiPostEntity,
  [entityTypes.postsSettings]: ApiPostsSettingsEntity,
  [entityTypes.noteSettings]: ApiNoteSettingsEntity,
  [entityTypes.userSettings]: ApiUserSettingsEntity,
  [entityTypes.orderBy]: ApiOrderByEntity,
}

export type ApiEntity = ApiEntityTypes[EntityName]

export type EntityTypes = {
  [entityTypes.user]: UserEntity,
  [entityTypes.space]: SpaceEntity,
  [entityTypes.spaceTab]: SpaceTabEntity,
  [entityTypes.note]: NoteEntity,
  [entityTypes.post]: PostEntity,
  [entityTypes.postsSettings]: PostsSettingsEntity,
  [entityTypes.noteSettings]: NoteSettingsEntity,
  [entityTypes.userSettings]: UserSettingsEntity,
  [entityTypes.orderBy]: OrderByEntity,
}
