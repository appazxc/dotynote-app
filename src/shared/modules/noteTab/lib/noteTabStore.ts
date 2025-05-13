import { InfinityStickTypeQueryKey } from 'shared/modules/noteTab/components/StickTypeList';

type Store = {
  scroll?: number;
  queryKey: InfinityStickTypeQueryKey;
}

export const noteTabStore = new Map<string, Store>();