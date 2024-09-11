import React from 'react';

import { BrowserLocationProvider } from 'shared/components/BrowserProviders/BrowserLocationProvider';
import { BrowserNavigateProvider } from 'shared/components/BrowserProviders/BrowserNavigateProvider';
import { BrowserRouterProvider } from 'shared/components/BrowserProviders/BrowserRouterProvider';

type Props = React.PropsWithChildren;

export const BrowserProviders = React.memo(({ children }: Props) => {
  return (
    <BrowserRouterProvider>
      <BrowserLocationProvider>
        <BrowserNavigateProvider>
          {children}
        </BrowserNavigateProvider>
      </BrowserLocationProvider>
    </BrowserRouterProvider>
  );
});
