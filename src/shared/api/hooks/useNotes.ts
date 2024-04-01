import { useQuery } from '@tanstack/react-query';

import { options } from 'shared/api/options';
import { LoadListFilters } from 'shared/api/options/notes';

type Params = {
  filters?: LoadListFilters
}

export const useNotes = ({ filters }: Params = {}) => {
  return useQuery(options.notes.loadList(filters));
};
