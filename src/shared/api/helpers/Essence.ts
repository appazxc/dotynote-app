import { EntityName } from "shared/constants/entityNames";
import apiFactory, { Api } from "../apiFactory";
import { getStore } from "shared/helpers/store/getStore";
import { AppStore } from "shared/store";
import { updateEntity } from "shared/store/slices/entitiesSlice";
import { selectUserId } from "shared/store/slices/authSlice";
import { invariant } from "shared/util/invariant";

export default class Essense<T extends { id?: string }> {
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

  async load(id: string) {
    return await this.api.get<string>(`${this.path}/${id}`);
  }

  async loadList({ filters }) {
    return await this.api.get<string[]>(`${this.path}`, filters);
  }

  async update(id: string, data?: Partial<T> | null) {
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
    } catch(e) {
      this.updateEntity(id, entity);
      console.log('error', e);
    }
  }

  async create(data: Partial<T>) {
    return await this.api.post<string>(this.path, data);
  }

  updateEntity(id: string, data: Partial<T>) {
    this.store.dispatch(updateEntity({ id, type: this.entityName, data }));
  }
}