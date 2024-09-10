import { EntityName, entityNames } from 'shared/constants/entityNames';
import { noteSchema } from 'shared/schemas/note.schema';
import { noteSettingsSchema } from 'shared/schemas/noteSettings.schema';
import { postSchema } from 'shared/schemas/post.schema';
import { postsSettingsSchema } from 'shared/schemas/postsSettings.schema';
import { spaceSchema } from 'shared/schemas/space.schema';
import { spaceTabSchema } from 'shared/schemas/spaceTab.schema';
import { userSchema } from 'shared/schemas/user.schema';
import { userSettingsSchema } from 'shared/schemas/userSettings.schema';
import { makeGetById } from 'shared/selectors/helpers/makeGetBy';
import { ApiEntityTypes, EntityTypes } from 'shared/types/entities/entityTypes';
import { AppState } from 'shared/types/store';

import { makeGetEntityById } from './makeGetById';
import { makeGetEntitiesById } from './makeGetSelectEntities';

const schemaMap = {
  [entityNames.note]: noteSchema,
  [entityNames.noteSettings]: noteSettingsSchema,
  [entityNames.post]: postSchema,
  [entityNames.postsSettings]: postsSettingsSchema,
  [entityNames.space]: spaceSchema,
  [entityNames.spaceTab]: spaceTabSchema,
  [entityNames.user]: userSchema,
  [entityNames.userSettings]: userSettingsSchema,
};

export default class Selector<T extends EntityName> {
  getEntitiesById: (state: AppState, ids?: string[]) => EntityTypes[T][];
  getEntityById: (state: AppState, id?: string | number | null) => EntityTypes[T] | null;
  getById: (state: AppState, id?: string | number | null) => ApiEntityTypes[T] | null;
  makeGetEntityById: () => (state: AppState, id?: string | number | null) => EntityTypes[T] | null;
  makeGetById: () => (state: AppState, id?: string | number | null) => ApiEntityTypes[T] | null;

  constructor(entityName: T) {
    this.getById = makeGetById(entityName);
    this.getEntityById = makeGetEntityById(schemaMap[entityName]);
    this.getEntitiesById = makeGetEntitiesById(schemaMap[entityName]);
    this.makeGetEntityById = () => makeGetEntityById(schemaMap[entityName]);
    this.makeGetById = () => makeGetById(entityName);
  }
}
