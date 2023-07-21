import { EntityName, entityNames } from 'shared/constants/entityNames';

import { AppSessionEntity } from './AppSessionEntity';
import { UserEntity } from './UserEntity';
import { SpaceEntity } from './SpaceEntity';
import { SpaceTabEntity } from './SpaceTabEntity';

export type EntityTypes = {
  [entityNames.appSession]: AppSessionEntity
  [entityNames.user]: UserEntity
  [entityNames.space]: SpaceEntity
  [entityNames.spaceTab]: SpaceTabEntity
}

export type Entity = EntityTypes[EntityName]
