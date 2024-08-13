import React from 'react';

import { useLocation } from '@tanstack/react-router';

import { BrowserLocationContext } from './BrowserLocationContext';

type Props = {
  children: React.ReactNode
}

export const BrowserLocationProvider = ({ children }: Props) => {
  const location = useLocation();

  return (
    <BrowserLocationContext.Provider value={location}>
      {children}
    </BrowserLocationContext.Provider>
  );
};