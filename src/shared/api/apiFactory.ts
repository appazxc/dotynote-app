import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getStore } from 'shared/store/helpers/getStore';
import { selectToken } from 'shared/store/slices/authSlice';

const API_ROOT = '/api';

/**
 * If the path starts with `/beta`, do not append `/v1` to the api root
 * url. Alternatively we have the useRoot param for when we just want to
 * use the root path.
 */
const getBaseApi = (path: string) => {
  return `${API_ROOT}/v1`;
};

export type ApiError = AxiosError<
  { errors: string[] } | { error: string } | any
>;

export type Params = {
  [key: string]: string;
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
    get(path, params) {
      return axios
        .get(getBaseApi(path) + path, {
          params,
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    post(path, body) {
      return axios
        .post(getBaseApi(path) + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    patch(path, body) {
      return axios
        .patch(getBaseApi(path) + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    put(path, body) {
      return axios
        .put(getBaseApi(path) + path, body, {
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    delete(path, params) {
      return axios
        .delete(getBaseApi(path) + path, {
          params,
          headers: createHeaders(),
        })
        .then(response => handleResponse(response));
    },
    request(requestConfig) {
      return axios
        .request(
          Object.assign(requestConfig, {
            url: getBaseApi(requestConfig.url ?? '') + requestConfig.url,
            data: requestConfig.data ? requestConfig.data : null,
            headers: createHeaders(),
          })
        )
        .then(response => handleResponse(response));
    },
  };

  return api;
};

function handleResponse(
  response: AxiosResponse
) {
  const data = response.data;

  return data.data ? data.data : data;
}
