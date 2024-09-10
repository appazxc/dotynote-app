import { EntityName, entityNames } from 'shared/constants/entityNames';
import { ApiNoteEntity, NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiNoteSettingsEntity, NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { ApiUserSettingsEntity, UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

import { ApiPostEntity, PostEntity } from './PostEntity';
import { ApiPostsSettingsEntity, PostsSettingsEntity } from './PostsSettingsEntity';
import { ApiSpaceEntity, SpaceEntity } from './SpaceEntity';
import { ApiSpaceTabEntity, SpaceTabEntity } from './SpaceTabEntity';
import { ApiUserEntity, UserEntity } from './UserEntity';

export type ApiEntityTypes = {
  [entityNames.user]: ApiUserEntity,
  [entityNames.space]: ApiSpaceEntity,
  [entityNames.spaceTab]: ApiSpaceTabEntity,
  [entityNames.note]: ApiNoteEntity,
  [entityNames.post]: ApiPostEntity,
  [entityNames.postsSettings]: ApiPostsSettingsEntity,
  [entityNames.noteSettings]: ApiNoteSettingsEntity,
  [entityNames.userSettings]: ApiUserSettingsEntity,
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
}
