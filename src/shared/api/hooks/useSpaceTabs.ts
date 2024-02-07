import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId, selectSortedSpaceTabs } from 'shared/store/slices/appSlice';

import { options } from '../options';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const spaceId = useAppSelector(selectActiveSpaceId);

  const query = useQuery({
    ...options.spaceTabs.list({ spaceId: spaceId! }),
    enabled: !!spaceId,
  });

  const sortedTabs = useAppSelector((state) => selectSortedSpaceTabs(state, { ids: query.data }));

  if (!spaceId) {
    return query;
  }

  const data = query.data ? (sorted ? sortedTabs : query.data) : query.data;

  return {
    ...query,
    data,
  } as typeof query;
};
