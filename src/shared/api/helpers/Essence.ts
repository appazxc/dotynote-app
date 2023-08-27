import { EntityName } from "shared/constants/entityNames";
import apiFactory, { Api } from "../apiFactory";
import { getStore } from "shared/helpers/store/getStore";
import { AppStore } from "shared/store";
import { updateEntity } from "shared/store/slices/entitiesSlice";
import { wait } from "shared/util/wait";

export default class Essense<T> {
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

  async update(id: string, data: Partial<T>) {
    const entity = this.selector.getById(this.store.getState(), id);

    if (!entity) {
      return;
    }

    try {
      this.store.dispatch(updateEntity({ id, type: this.entityName, data }));
      await wait(2000);
      return await this.api.patch(`${this.path}/${id}`, data);
    } catch(e) {
      this.store.dispatch(updateEntity({ id, type: this.entityName, data: entity }));

      console.log('error', e);
    }
  }

  async create(data: Partial<T>) {
    return await this.api.post<string>(this.path, data);
  }
}