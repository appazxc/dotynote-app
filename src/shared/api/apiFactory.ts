import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import { nanoid } from 'nanoid';

import { logout } from 'shared/actions/logout';
import { queryClient } from 'shared/api/queryClient';
import { getBaseApi } from 'shared/helpers/api/getBaseApi';
import { getStore } from 'shared/helpers/store/getStore';
import { selectRefreshToken, selectToken } from 'shared/selectors/auth/selectToken';
import { getBroadcastService } from 'shared/services/broadcastService';
import { logger } from 'shared/services/logger';
import { setRefreshToken, setToken } from 'shared/store/slices/authSlice';
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
    config?: AxiosRequestConfig
  ): Promise<T>;
  post<T>(path: string, body?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(path: string, body: any, options?: Options): Promise<T>;
  put<T>(path: string, body: any, options?: Options): Promise<T>;
  delete<T>(path: string, params?: Params, options?: Options): Promise<T>;
  request<T>(requestConfig: AxiosRequestConfig, options?: Options): Promise<T>;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const { dispatch, getState } = getStore();
  const requestId = nanoid();

  // Use internal config property instead of header
  (config as any)._requestId = requestId;

  const pickItems = ['url'];
  if (!(config.data instanceof FormData)) {
    pickItems.push('data');
  }

  dispatch(startRequest({ id: requestId, request: pick(config, pickItems) }));

  // Set Authorization header only if not already set
  if (!config.headers.Authorization) {
    const token = selectToken(getState());
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const { dispatch } = getStore();
    const requestId = (response.config as any)._requestId;

    dispatch(finishRequest({ id: requestId }));

    return response;
  },
  async (error) => {
    const { dispatch, getState } = getStore();
    const requestId = (error.config as any)?._requestId;

    dispatch(finishRequest({ id: requestId }));

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = selectRefreshToken(getState());

        if (!refreshToken) {
          logger.info('Logout triggered due to missing refresh token during 401 handling', {
            errorCategory: 'authentication',
            action: 'auto_logout',
            extra: { reason: 'no_refresh_token' },
          });
          return dispatch(logout(false));
        }
           
        const response = await queryClient.fetchQuery({
          queryKey: ['refreshToken'],
          queryFn: async () => {
            const response = await axios.post<{ token: string; refreshToken: string }>(
              getBaseApi() + '/auth/refresh', {}, {
                method: 'post',
                headers: {
                  Authorization: `Bearer ${refreshToken}`,
                },
              });

            return response.data;
          },
          gcTime: 60000,
          staleTime: 60000,
        });

        // Update Redux store
        dispatch(setToken(response.token));
        dispatch(setRefreshToken(response.refreshToken));
        
        getBroadcastService()?.broadcastTokenUpdate(response.token, response.refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${response.token}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logger.error('Refresh token request failed', refreshError as Error, {
          errorCategory: 'api_error',
          severity: 'high',
          action: 'refresh_token_request',
          extra: { reason: 'refresh_token_axios_error' },
        });
        return dispatch(logout(false));
      }
    } else if (error.response?.status === 401 && originalRequest?._retry) {
      logger.info('Logout triggered due to 401 error during retry', {
        errorCategory: 'authentication',
        action: 'auto_logout',
        extra: { reason: '401_error_during_retry' },
      });
      return dispatch(logout(false));
    }

    return Promise.reject(error);
  });

export const provideJwt = () => {
  const { getState } = getStore();

  return selectToken(getState());
};

export default () => {

  const createHeaders = (headers = {}) => ({
    ...headers,
  });

  const api: Api = {
    async get(path, params = {}, config: AxiosRequestConfig = {}) {
      const { headers, ...restConfig } = config;

      return axiosInstance
        .get(getBaseApi() + path, {
          params: pickBy(params, (param) => param !== undefined),
          headers: createHeaders(headers),
          ...restConfig,
        })
        .then(response => handleResponse(response));
    },
    async post(path, body = {}, config: AxiosRequestConfig = {}) {
      const { headers, ...restConfig } = config;

      return axiosInstance
        .post(getBaseApi() + path, body, {
          headers: createHeaders(headers),
          withCredentials: true,
          ...restConfig,
        } )
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
