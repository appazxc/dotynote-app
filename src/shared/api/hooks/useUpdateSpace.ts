import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceEntity } from 'shared/types/entities/SpaceEntity';

import { entityApi } from '../entityApi';

export const useUpdateSpace = (id: IdentityType) => {
  return useMutation({
    mutationFn: (space: Partial<SpaceEntity>) => {
      return entityApi.space.update(id, space);
    },
  });
};
