import { EntityName, entityNames } from 'shared/constants/entityNames';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';

import { NoteEntity } from './NoteEntity';
import { PostEntity } from './PostEntity';
import { PostsSettingsEntity } from './PostsSettingsEntity';
import { SpaceEntity } from './SpaceEntity';
import { SpaceTabEntity } from './SpaceTabEntity';
import { UserEntity } from './UserEntity';

export type EntityTypes = {
  [entityNames.user]: UserEntity,
  [entityNames.space]: SpaceEntity,
  [entityNames.spaceTab]: SpaceTabEntity,
  [entityNames.note]: NoteEntity,
  [entityNames.post]: PostEntity,
  [entityNames.postsSettings]: PostsSettingsEntity,
  [entityNames.noteSettings]: NoteSettingsEntity,
}

export type Entity = EntityTypes[EntityName]
