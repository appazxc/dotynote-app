import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';
import { LoadListFilters } from 'shared/api/options/notes';
import { useAppSelector } from 'shared/store/hooks';
import { selectUserId } from 'shared/store/slices/authSlice';
import { invariant } from 'shared/util/invariant';

type Params = {
  filters?: LoadListFilters
}

export const useNotes = ({ filters }: Params = {}) => {
  const userId = useAppSelector(selectUserId);

  invariant(userId, 'Missing userId');
  
  return useQuery(options.notes.loadList({ ...filters, userId }));
};
