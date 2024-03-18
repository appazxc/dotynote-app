import { queryOptions } from '@tanstack/react-query';

import { hour } from 'shared/constants/time';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { entityApi } from '../entityApi';

type Filters = {
  spaceId?: IdentityType;
};

export const list = (filters: Filters) => {
  return queryOptions({
    queryKey: ['spaceTabs', filters],
    queryFn: () => {
      return entityApi.spaceTab.loadList({ filters });
    },
    staleTime: hour,
  });
};
