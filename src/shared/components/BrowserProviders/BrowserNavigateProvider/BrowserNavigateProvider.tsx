import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { BrowserNavigateContext } from './BrowserNavigateContext';

type Props = {
  children: React.ReactNode;
}

export const BrowserNavigateProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  return (
    <BrowserNavigateContext.Provider value={navigate}>
      {children}
    </BrowserNavigateContext.Provider>
  );
};