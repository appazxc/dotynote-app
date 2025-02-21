import { api } from 'shared/api';
import { EntityName } from 'shared/constants/entityNames';
import { getStore } from 'shared/helpers/store/getStore';
import { selectUserId } from 'shared/selectors/auth/selectUserId';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { AppStore } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

import { Api } from '../apiFactory';

type DeleteOptions = {
  deleteFlag?: boolean;
}
export default class Essense<T extends { id: string | number }> {
  api: Api;
  path: string;
  entityName: EntityName;
  selector: any;
  
  constructor(entityName: EntityName, selector) {
    this.path = `/${entityName}s`;
    this.entityName = entityName;
    this.api = api;
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

  async load<T extends string>(route: string | number, filters = {}) {
    return await this.api.get<T>(`${this.path}/${route}`, filters);
  }

  async loadList<T = string>({ filters = {} } = {}) {
    return await this.api.get<T[]>(`${this.path}`, filters);
  }

  async update(id: string | number, data: Partial<T>) {
    const entity = this.selector.getById(this.store.getState(), id);
    
    if (!entity || !data) {
      return;
    }
     
    const { id: omitId, ...restData } = data;

    try {
      this.updateEntity(id, data);

      if (!entity._isFake) {
        return await this.api.patch(`${this.path}/${id}`, restData);
      }
    } catch (error) {
      this.updateEntity(id, entity);

      throw error;
    }
  }

  async create<I = string>(data: Partial<T>) {
    return await this.api.post<I>(this.path, data);
  }

  async updateRelation<R extends { id: string | number }>(relationPath, id, data: Partial<T[keyof T]>, selector: any) {
    const entity: T[keyof T] = selector.getById(this.store.getState(), id);
    
    if (!entity || !data) {
      return;
    }
    
    try {
      this.store.dispatch(updateEntity({ id, type: selector.type, data }));

      return this.api.patch<R['id']>(`${this.path}${relationPath}`, data);
    } catch (error) {
      this.store.dispatch(updateEntity({ id, type: selector.type, data: entity }));

      throw error;
    }
  }

  async deleteRelation(id: string | number, relation: string) {
    return this.api.delete<void>(`${this.path}/${id}/${relation}`);
  }

  async action<D>(action: string, data) {
    return this.api.post<D>(`${this.path}/${action}`, data);
  }

  async delete(id: any, { deleteFlag }: DeleteOptions = {}) {
    const entity = this.selector.getById(this.store.getState(), id);

    if (!entity._isFake) {
      await this.api.delete<void>(`${this.path}/${id}`);
    }

    if (deleteFlag) {
      this.store.dispatch(updateEntity({ id, type: this.entityName, data: { _isDeleted: true } }));
    } else {
      this.store.dispatch(deleteEntity({ id, type: this.entityName }));
    }
  }

  async deleteMany(ids: (any)[], { deleteFlag }: DeleteOptions = {}) {
    await this.api.delete<void>(`${this.path}`, { ids: ids.join(',') });

    ids.forEach((id) => {
      if (deleteFlag) {
        this.store.dispatch(updateEntity({ id, type: this.entityName, data: { _isDeleted: true } }));
      } else {
        this.store.dispatch(deleteEntity({ id, type: this.entityName }));
      }
    });
  }

  updateEntity(id: any, data: any) {
    this.store.dispatch(updateEntity({ id, type: this.entityName, data }));
  }

  deleteEntity(id: string) {
    this.store.dispatch(deleteEntity({ id, type: this.entityName }));
  }
}