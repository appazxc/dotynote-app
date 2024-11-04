import { queryOptions } from '@tanstack/react-query';

import { api } from 'shared/api';

export const me = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => {
      return api.get<string>('/users/me');
    },
  });
};

export const usernameCheck = (username) => {
  return queryOptions({
    queryKey: ['usernameCheck', username],
    queryFn: () => {
      return api.get<boolean>('/users/check-username', { username });
    },
  });
};