import React from 'react';

import MainProviders from './components/Providers';
import { Main } from './components/Main';

export default function Core () {
  return (
    <MainProviders>
      <Main />
    </MainProviders>
  );
}
