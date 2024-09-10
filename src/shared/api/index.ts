import apiFactory from './apiFactory';

function createApi() {
  const api = apiFactory();

  return api;
}

export const api = createApi();
