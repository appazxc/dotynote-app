import React from 'react';

import { Main } from './components/Main';
import MainProviders from './components/Providers';

export default function Core () {
  return (
    <MainProviders>
      <Main />
    </MainProviders>
  )
}
