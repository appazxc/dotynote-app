import { VStack } from '@chakra-ui/react';
import React from 'react';

import { SpaceCard } from 'shared/modules/spaces/components/SpaceCard';

type Props = {
  activeSpaceId: string | null;
  spaceIds: string[];
};

export const SpacesCards = React.memo(({ spaceIds, activeSpaceId }: Props) => {
  return (
    <VStack gap="2">
      {spaceIds.map((spaceId) => {
        return (
          <SpaceCard
            key={spaceId}
            id={spaceId}
            isActive={activeSpaceId === spaceId}
          />
        );
      })}
    </VStack>
  );
});
