import { EntityName, entityNames } from 'shared/constants/entityNames';

import { AppSessionEntity } from './AppSessionEntity';
import { UserEntity } from './UserEntity';

export type EntityTypes = {
  [entityNames.appSession]: AppSessionEntity
  [entityNames.user]: UserEntity
}

export type Entity = EntityTypes[EntityName]
