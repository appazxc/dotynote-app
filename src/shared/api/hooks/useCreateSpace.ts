import { useMutation } from '@tanstack/react-query';

import { SpaceEntity } from 'shared/types/entities/SpaceEntity';

import { entityApi } from '../entityApi';

export const useCreateSpace = () => {
  return useMutation({
    mutationFn: (space: Partial<SpaceEntity>) => {
      return entityApi.space.create(space);
    },
  });
};
