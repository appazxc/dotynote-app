import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import { Toaster } from 'shared/components/ui/toaster';
import config from 'shared/config';

import { Main } from './Main';
import { Providers } from './Providers';

export default function Core () {
  return (
    <Providers>
      <Main />
      <Toaster />
      {config.devtools.query && <ReactQueryDevtools initialIsOpen />}
    </Providers>
  );
}
