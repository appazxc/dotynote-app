import { EntityName } from 'shared/constants/entityNames';
import { AppState } from 'shared/store';
import { Entity } from 'shared/types/entities/entityTypes';

import { makeGetById } from './makeGetById';

export default class Selector<T extends Entity> {
  getById: (state: AppState, id?: string) => T | null;

  constructor(entityName: EntityName) {
    this.getById = makeGetById(entityName);
  }
}
