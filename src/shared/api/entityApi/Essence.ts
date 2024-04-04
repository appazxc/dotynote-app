import { EntityName } from 'shared/constants/entityNames';
import { getStore } from 'shared/helpers/store/getStore';
import { selectUserId } from 'shared/store/slices/authSlice';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { AppStore } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

import apiFactory, { Api } from '../apiFactory';

type DeleteOptions = {
  deleteFlag?: boolean,
}
export default class Essense<T extends { id?: IdentityType }> {
  api: Api;
  path: string;
  entityName: EntityName;
  selector: any;
  
  constructor(entityName: EntityName, selector) {
    this.path = `/${entityName}s`;
    this.entityName = entityName;
    this.api = apiFactory();
    this.selector = selector;
  }

  get store(): AppStore {
    return getStore();
  }

  get userId(): string {
    const userId = selectUserId(this.store.getState());

    invariant(userId, 'Missing userId');

    return userId;
  }

  async load(id?: string | number) {
    invariant(id, 'Missing id');

    return await this.api.get<string>(`${this.path}/${id}`);
  }

  async loadList({ filters = {} } = {}) {
    return await this.api.get<IdentityType[]>(`${this.path}`, filters);
  }

  async update(id: IdentityType, data?: Partial<T> | null) {
    const entity = this.selector.getById(this.store.getState(), id);
    
    if (!entity || !data) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: omitId, ...restData } = data;

    try {
      this.updateEntity(id, data);

      if (!entity.isFake) {
        return await this.api.patch(`${this.path}/${id}`, restData);
      }
    } catch (error) {
      this.updateEntity(id, entity);

      throw error;
    }
  }

  async create(data: Partial<T>) {
    return await this.api.post<string>(this.path, data);
  }

  async createRelation<R>(id: IdentityType, relation: string, data: Partial<R>) {
    return this.api.post<string>(`${this.path}/${id}/${relation}`, data);
  }

  async deleteRelation(id: IdentityType, relation: string) {
    return this.api.delete<void>(`${this.path}/${id}/${relation}`);
  }

  async action<D>(action: string, data) {
    return this.api.post<D>(`${this.path}/${action}`, data);
  }

  async delete(id: IdentityType, { deleteFlag }: DeleteOptions = {}) {
    
    if (deleteFlag) {
      this.store.dispatch(updateEntity({ id, type: this.entityName, data: { _isDeleted: true } }));
    } else {
      this.store.dispatch(deleteEntity({ id, type: this.entityName }));
    }
    const result = await this.api.delete<void>(`${this.path}/${id}`);

    return result;
  }

  updateEntity(id: IdentityType, data: Partial<T>) {
    this.store.dispatch(updateEntity({ id, type: this.entityName, data }));
  }

  deleteEntity(id: IdentityType) {
    this.store.dispatch(deleteEntity({ id, type: this.entityName }));
  }
}