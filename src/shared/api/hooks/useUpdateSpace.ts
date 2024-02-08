import { useMutation } from '@tanstack/react-query';

import { SpaceEntity } from 'shared/types/entities/SpaceEntity';

import { entityApi } from '../entityApi';

export const useUpdateSpace = (id: SpaceEntity['id']) => {
  return useMutation({
    mutationFn: (space: Partial<SpaceEntity>) => {
      return entityApi.space.update(id, space);
    },
  });
};
