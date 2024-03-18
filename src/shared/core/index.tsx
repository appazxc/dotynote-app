import React from 'react';

import { Main } from './components/Main';
import MainProviders from './components/Providers';

export default function Core () {
  console.log('core');
  
  return (
    <MainProviders>
      <Main />
    </MainProviders>
  );
}
