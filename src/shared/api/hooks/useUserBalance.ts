import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const useUserBalance = () => {
  return useQuery(options.users.userBalance());
};
