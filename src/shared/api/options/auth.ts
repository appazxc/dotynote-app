import { queryOptions } from '@tanstack/react-query';

import { api } from 'shared/api';

export const refreshToken = (refreshToken: string) => {
  return queryOptions({
    queryKey: ['refreshToken'],
    queryFn: () => {
      return api.post<{ token: string; refreshToken: string }>('/auth/refresh', {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    },
  });
};