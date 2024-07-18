import { queryOptions } from '@tanstack/react-query';

import { entityApi } from '../entityApi';

export const me = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () => {
      return entityApi.user.loadMe();
    },
  });
};

export const usernameCheck = (username) => {
  return queryOptions({
    queryKey: ['usernameCheck', username],
    queryFn: () => {
      return entityApi.user.usernameCheck(username);
    },
  });
};