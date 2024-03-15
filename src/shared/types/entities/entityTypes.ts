import { EntityName, entityNames } from 'shared/constants/entityNames';

import { NoteEntity } from './NoteEntity';
import { PostEntity } from './PostEntity';
import { PostSettingsEntity } from './PostSettingsEntity';
import { SpaceEntity } from './SpaceEntity';
import { SpaceTabEntity } from './SpaceTabEntity';
import { UserEntity } from './UserEntity';

export type EntityTypes = {
  [entityNames.user]: UserEntity,
  [entityNames.space]: SpaceEntity,
  [entityNames.spaceTab]: SpaceTabEntity,
  [entityNames.note]: NoteEntity,
  [entityNames.post]: PostEntity,
  [entityNames.postSettings]: PostSettingsEntity,
}

export type Entity = EntityTypes[EntityName]
