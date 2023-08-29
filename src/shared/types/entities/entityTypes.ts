import { EntityName, entityNames } from 'shared/constants/entityNames';

import { UserEntity } from './UserEntity';
import { SpaceEntity } from './SpaceEntity';
import { NoteEntity } from './NoteEntity';
import { SpaceTabEntity } from './SpaceTabEntity';
import { PostEntity } from './PostEntity';

export type EntityTypes = {
  [entityNames.user]: UserEntity,
  [entityNames.space]: SpaceEntity,
  [entityNames.spaceTab]: SpaceTabEntity,
  [entityNames.note]: NoteEntity,
  [entityNames.post]: PostEntity,
}

export type Entity = EntityTypes[EntityName]
