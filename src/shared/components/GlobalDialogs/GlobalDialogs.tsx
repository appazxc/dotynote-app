import React from 'react';

import { InsufficientCreditsModal } from 'shared/containers/modals/InsufficientCreditsModal';
import { StorageCapacityReachedModal } from 'shared/containers/modals/StorageCapacityReachedModal';

export const GlobalDialogs: React.FC = () => {
  return (
    <>
      <InsufficientCreditsModal />
      <StorageCapacityReachedModal />
    </>
  );
}; 