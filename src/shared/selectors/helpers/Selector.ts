import { EntityName, entityTypes } from 'shared/constants/entityTypes';
import { noteSchema } from 'shared/schemas/note.schema';
import { noteDotSchema } from 'shared/schemas/noteDot.schema';
import { noteImageSchema } from 'shared/schemas/noteImage.schema';
import { noteSettingsSchema } from 'shared/schemas/noteSettings.schema';
import { orderBySchema } from 'shared/schemas/orderBy.schema';
import { postSchema } from 'shared/schemas/post.schema';
import { postDotSchema } from 'shared/schemas/postDot.schema';
import { postInternalSchema } from 'shared/schemas/postInternal.schema';
import { postsSettingsSchema } from 'shared/schemas/postsSettings.schema';
import { spaceSchema } from 'shared/schemas/space.schema';
import { spaceTabSchema } from 'shared/schemas/spaceTab.schema';
import { userSchema } from 'shared/schemas/user.schema';
import { userSettingsSchema } from 'shared/schemas/userSettings.schema';
import { makeGetById } from 'shared/selectors/helpers/makeGetBy';
import { makeGetByIds } from 'shared/selectors/helpers/makeGetByIds';
import { makeGetEntitiesById } from 'shared/selectors/helpers/makeGetEntitiesById';
import { makeGetEntityById } from 'shared/selectors/helpers/makeGetEntityById';
import { ApiEntityTypes, EntityTypes } from 'shared/types/entities/entityTypes';
import { AppState } from 'shared/types/store';

const schemaMap = {
  [entityTypes.note]: noteSchema,
  [entityTypes.noteSettings]: noteSettingsSchema,
  [entityTypes.post]: postSchema,
  [entityTypes.postsSettings]: postsSettingsSchema,
  [entityTypes.space]: spaceSchema,
  [entityTypes.spaceTab]: spaceTabSchema,
  [entityTypes.user]: userSchema,
  [entityTypes.userSettings]: userSettingsSchema,
  [entityTypes.orderBy]: orderBySchema,
  [entityTypes.postInternal]: postInternalSchema,
  [entityTypes.postDot]: postDotSchema,
  [entityTypes.noteDot]: noteDotSchema,
  [entityTypes.noteImage]: noteImageSchema,
};

export default class Selector<T extends EntityName> {
  type: T;
  getEntitiesById: (state: AppState, ids?: (string | number)[]) => EntityTypes[T][];
  getEntityById: (state: AppState, id?: string | number | null) => EntityTypes[T] | null;
  getById: (state: AppState, id?: string | number | null) => ApiEntityTypes[T] | null;
  getByIds: (state: AppState, ids?: (string | number)[]) => ApiEntityTypes[T][];
  makeGetEntityById: () => (state: AppState, id?: string | number | null) => EntityTypes[T] | null;
  makeGetById: () => (state: AppState, id?: string | number | null) => ApiEntityTypes[T] | null;

  constructor(entityType: T) {
    this.type = entityType;
    this.getById = makeGetById(entityType);
    this.getByIds = makeGetByIds(entityType);
    this.getEntityById = makeGetEntityById(schemaMap[entityType]);
    this.getEntitiesById = makeGetEntitiesById(schemaMap[entityType]);
    this.makeGetEntityById = () => makeGetEntityById(schemaMap[entityType]);
    this.makeGetById = () => makeGetById(entityType);
  }
}
