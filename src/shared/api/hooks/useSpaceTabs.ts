import { useQuery } from '@tanstack/react-query';

import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId, selectSortedSpaceTabEntities } from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { options } from '../options';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const spaceId = useAppSelector(selectActiveSpaceId);

  const query = useQuery({
    ...options.spaceTabs.list({ spaceId: spaceId! }),
    enabled: !!spaceId,
  });

  const tabs = useAppSelector((state) => spaceTabSelector.getByIds(state, query.data));
  const sortedTabs = useAppSelector((state) => selectSortedSpaceTabEntities(state, { ids: query.data }));

  if (!spaceId) {
    return query as typeof query & { tabs?: SpaceTabEntity[]};
  }

  const tabsData = sorted ? sortedTabs : tabs;

  return {
    ...query,
    tabs: tabsData,
  } as typeof query & { tabs: SpaceTabEntity[]};
};
