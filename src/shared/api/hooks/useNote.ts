import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';

export const useNote = (
  id: string | undefined | null, 
  queryOptions?: Partial<ReturnType<typeof options.notes.load>>
) => {
  return useQuery({ ...options.notes.load(id), ...queryOptions });
};
