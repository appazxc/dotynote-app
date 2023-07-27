import { EntityName, entityNames } from 'shared/constants/entityNames';

import { AppSessionEntity } from './AppSessionEntity';
import { UserEntity } from './UserEntity';
import { SpaceEntity } from './SpaceEntity';
import { NoteEntity } from './NoteEntity';
import { SpaceTabEntity } from './SpaceTabEntity';

export type EntityTypes = {
  [entityNames.appSession]: AppSessionEntity
  [entityNames.user]: UserEntity
  [entityNames.space]: SpaceEntity
  [entityNames.spaceTab]: SpaceTabEntity
  [entityNames.note]: NoteEntity
}

export type Entity = EntityTypes[EntityName]
