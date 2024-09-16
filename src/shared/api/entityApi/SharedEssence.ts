import { getStore } from 'shared/helpers/store/getStore';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { AppStore } from 'shared/types/store';

import apiFactory, { Api } from '../apiFactory';

export default class SharedEssense {
  api: Api;
  selector: any;
  
  constructor() {
    this.api = apiFactory();
  }

  get store(): AppStore {
    return getStore();
  }

  async updateEntity(path, id, data, selector) {
    const entity = selector.getById(this.store.getState(), id);
    
    if (!entity || !data) {
      return;
    }
    
    try {
      this.store.dispatch(updateEntity({ id: id, type: selector.type, data }));

      return this.api.patch(path, data);
    } catch (error) {
      this.store.dispatch(updateEntity({ id: id, type: selector.type, data: entity }));

      throw error;
    }
  }
}