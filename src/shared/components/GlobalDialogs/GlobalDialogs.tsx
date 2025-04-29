import React from 'react';

import { InsufficientCreditsModal } from 'shared/containers/modals/InsufficientCreditsModal';

export const GlobalDialogs: React.FC = () => {
  return (
    <>
      <InsufficientCreditsModal />
    </>
  );
}; 