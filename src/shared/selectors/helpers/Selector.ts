import { EntityName, entityNames } from 'shared/constants/entityNames';
import { noteSchema } from 'shared/schemas/note.schema';
import { noteSettingsSchema } from 'shared/schemas/noteSettings.schema';
import { postSchema } from 'shared/schemas/post.schema';
import { postsSettingsSchema } from 'shared/schemas/postsSettings.schema';
import { spaceSchema } from 'shared/schemas/space.schema';
import { spaceTabSchema } from 'shared/schemas/spaceTab.schema';
import { userSchema } from 'shared/schemas/user.schema';
import { makeGetBy } from 'shared/selectors/helpers/makeGetBy';
import { Entity } from 'shared/types/entities/entityTypes';
import { AppState } from 'shared/types/store';

import { makeGetById } from './makeGetById';
import { makeGetSelectEntities } from './makeGetSelectEntities';

const schemaMap = {
  [entityNames.note]: noteSchema,
  [entityNames.noteSettings]: noteSettingsSchema,
  [entityNames.post]: postSchema,
  [entityNames.postsSettings]: postsSettingsSchema,
  [entityNames.space]: spaceSchema,
  [entityNames.spaceTab]: spaceTabSchema,
  [entityNames.user]: userSchema,
};

export default class Selector<T extends Entity> {
  getByIds: (state: AppState, ids?: string[]) => T[];
  getById: (state: AppState, id?: string | number | null) => T | null;
  getBy: (state: AppState, id?: string | number | null) => T | null;
  makeGetById: () => (state: AppState, id?: string | number | null) => T | null;

  constructor(entityName: EntityName) {
    this.getBy = makeGetBy(entityName);
    this.getById = makeGetById(schemaMap[entityName]);
    this.getByIds = makeGetSelectEntities(schemaMap[entityName]);
    this.makeGetById = () => makeGetById(schemaMap[entityName]);
  }
}
