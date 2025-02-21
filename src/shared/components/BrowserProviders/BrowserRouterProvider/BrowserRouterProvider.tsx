import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { BrowserRouterContext } from './BrowserRouterContext';

type Props = {
  children: React.ReactNode;
}

export const BrowserRouterProvider = ({ children }: Props) => {
  const router = useRouter();

  return (
    <BrowserRouterContext.Provider value={router}>
      {children}
    </BrowserRouterContext.Provider>
  );
};