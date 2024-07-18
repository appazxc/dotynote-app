import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const useUsernameCheck = (
  username: string, 
  queryOptions?: Partial<ReturnType<typeof options.users.usernameCheck>>
) => {
  return useQuery({ ...options.users.usernameCheck(username), ...queryOptions });
};
