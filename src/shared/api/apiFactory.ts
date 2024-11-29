import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import isArray from 'lodash/isArray';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import { nanoid } from 'nanoid';

import { getBaseApi } from 'shared/helpers/api/getBaseApi';
import { getStore } from 'shared/helpers/store/getStore';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { addEntities } from 'shared/store/slices/entitiesSlice';
import { finishRequest, startRequest } from 'shared/store/slices/requestSlice';

export type ApiError = AxiosError<
  { errors: string[] } | { error: string } | any
>;

export type Params = {
  [key: string]: any;
};

type Options = {
  shouldCamelize: boolean;
};

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

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const { dispatch } = getStore();
  const requestId = nanoid(); 
  config.headers['X-Request-Id'] = requestId;

  const pickItems = ['url'];
  if (!(config.data instanceof FormData)) {
    pickItems.push('data');
  }

  dispatch(startRequest({ id: requestId, request: pick(config, pickItems) }));

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Перехватчик для ответов
axiosInstance.interceptors.response.use((response) => {
  const { dispatch } = getStore();
  const requestId = response.config.headers['X-Request-Id'];
  
  dispatch(finishRequest({ id: requestId }));

  return response;
}, (error) => {
  const { dispatch } = getStore();
  const requestId = error.config?.headers['X-Request-Id'];
  
  dispatch(finishRequest({ id: requestId }));

  return Promise.reject(error);
});

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

      return axiosInstance
        .get(getBaseApi() + path, {
          params: pickBy(updatedParams, (param) => param !== undefined),
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async post(path, body) {
      return axiosInstance
        .post(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async patch(path, body) {
      return axiosInstance
        .patch(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async put(path, body) {
      return axiosInstance
        .put(getBaseApi() + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async delete(path, params) {
      return axiosInstance
        .delete(getBaseApi() + path, {
          params,
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    async request(requestConfig) {
      return axiosInstance
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
