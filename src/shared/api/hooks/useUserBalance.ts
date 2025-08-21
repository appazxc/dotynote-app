import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';
import { useAppDispatch } from 'shared/store/hooks';

export const useUserBalance = () => {
  const dispatch = useAppDispatch();
  return useQuery(options.users.userBalance(dispatch));
};
