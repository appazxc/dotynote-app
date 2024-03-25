import { useMutation } from '@tanstack/react-query';

import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { entityApi } from '../entityApi';

export const useUpdateSpaceTab = (id: IdentityType) => {
  return useMutation({
    mutationFn: (data: Partial<SpaceTabEntity>) => {
      return entityApi.spaceTab.update(id, data);
    },
  });
};
