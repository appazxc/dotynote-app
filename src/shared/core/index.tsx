import React from 'react';

import { Main } from './Main';
import { Providers } from './Providers';

export default function Core () {
  return (
    <Providers>
      <Main />
    </Providers>
  );
}
