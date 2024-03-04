import { EntityName } from 'shared/constants/entityNames';
import { Entity } from 'shared/types/entities/entityTypes';
import { AppState } from 'shared/types/store';

import { makeGetById } from './makeGetById';
import { makeGetSelectEntities } from './makeGetSelectEntities';

export default class Selector<T extends Entity> {
  getById: (state: AppState, id?: string | null) => T | null;
  getByIds: (state: AppState, ids: string[]) => T[];

  constructor(entityName: EntityName) {
    this.getById = makeGetById(entityName);
    this.getByIds = makeGetSelectEntities(entityName);
  }
}
