import { InfinityStickNotesQueryKey } from 'shared/api/hooks/useInfinityStickNotes';

type Store = {
  scroll?: number;
  queryKey: InfinityStickNotesQueryKey;
}

export const noteTabStore = new Map<string, Store>();