import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const useOrderBy = (
  queryOptions?: Partial<ReturnType<typeof options.notes.loadOrderByList>>
) => {
  return useQuery({ ...options.notes.loadOrderByList(), ...queryOptions });
};
