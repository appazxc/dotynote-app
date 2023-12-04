import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStore } from 'shared/helpers/store/getStore';
import { selectToken } from 'shared/store/slices/authSlice';
import { getBaseApi } from 'shared/helpers/api/getBaseApi';
import { addEntities } from 'shared/store/slices/entitiesSlice';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import mapValues from 'lodash/mapValues';
import isArray from 'lodash/isArray';
import { wait } from 'shared/util/wait';

export type ApiError = AxiosError<
  { errors: string[] } | { error: string } | any
>;

export type Params = {
  [key: string]: string;
};

type Options = {
  shouldCamelize: boolean;
};

const delayMs = 2000;

export type Api = {
  get<T>(
    path: string,
    params?: Params,
  ): Promise<T>;
  post<T>(path: string, body: any, options?: Options): Promise<T>;
  patch<T>(path: string, body: any, options?: Options): Promise<T>;
  put<T>(path: string, body: any, options?: Options): Promise<T>;
  delete<T>(path: string, params?: Params, options?: Options): Promise<T>;
  request<T>(requestConfig: AxiosRequestConfig, options?: Options): Promise<T>;
};

export default () => {
  const provideJwt = () => {
    const { getState } = getStore();

    return selectToken(getState());
  };

  const createHeaders = () => ({
    ...(provideJwt()
      ? {
        Authorization: `Bearer ${provideJwt()}`,
      }
      : {}),
  });

  const api: Api = {
    async get(path, params = {}) {
      const updatedParams = mapValues(params, (value) => {
        if (isArray(value)) {
          return value.join(',');
        }

        return value;
      });

      await wait(delayMs);

      return axios
        .get(getBaseApi() + path, {
          params: pickBy(updatedParams, identity),
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async post(path, body) {
      await wait(delayMs);
      return axios
        .post(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async patch(path, body) {
      await wait(delayMs);
      return axios
        .patch(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async put(path, body) {
      await wait(delayMs);
      return axios
        .put(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async delete(path, params) {
      await wait(delayMs);
      return axios
        .delete(getBaseApi() + path, {
          params,
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async request(requestConfig) {
      await wait(delayMs);
      return axios
        .request(
          Object.assign(requestConfig, {
            url: getBaseApi() + requestConfig.url,
            data: requestConfig.data ? requestConfig.data : null,
            headers: createHeaders(),
          })
        )
        .then(response => handleResponse(response));
    },
  };

  return api;
};

function handleEntities(entities) {
  const { dispatch } = getStore();

  dispatch(addEntities(entities));
}

function handleResponse(
  response: AxiosResponse
) {
  const data = response.data;

  if (data.entities) {
    handleEntities(data.entities);
  }

  return data.data ? data.data : data;
}
