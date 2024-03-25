import apiFactory from './apiFactory';

function createApi() {
  const api = apiFactory();

  return api;
}

export default createApi();
