import { getStore } from 'shared/helpers/store/getStore';
import { AppStore } from 'shared/types/store';

import apiFactory, { Api } from '../apiFactory';

export default class ActionEssense {
  api: Api;
  path: string;
  selector: any;
  
  constructor(path: string) {
    this.path = path;
    this.api = apiFactory();
  }

  get store(): AppStore {
    return getStore();
  }

  async create<T = unknown>(data: unknown) {
    return await this.api.post<T>(this.path, data);
  }
}