import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId, selectSortedSpaceTabEntities, selectSortedSpaceTabs } from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { options } from '../options';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const spaceId = useAppSelector(selectActiveSpaceId);

  const query = useQuery({
    ...options.spaceTabs.list({ spaceId: spaceId! }),
    enabled: !!spaceId,
  });

  const tabs = useAppSelector((state) => spaceTabSelector.getByIds(state, query.data));
  const sortedTabs = React.useMemo(() => {
    console.log('tabs');
    
    return tabs;
  }, [tabs]);

  if (!spaceId) {
    return query as typeof query & { tabs?: SpaceTabEntity[]};
  }

  const tabsData = sorted ? tabs : tabs;

  return {
    ...query,
    tabs: tabsData,
  } as typeof query & { tabs: SpaceTabEntity[]};
};
