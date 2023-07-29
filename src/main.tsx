import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { initialize } from 'shared/core//actions/initializeActions';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
console.log('import.meta.env', import.meta.env);

if (import.meta.env.MOCK) {
  const { worker } = require('./shared/test/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(
    <Main />
  );
});
