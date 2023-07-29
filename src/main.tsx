import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { initialize } from 'shared/core//actions/initializeActions';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

if (import.meta.env.VITE_MOCK === 'true') {
  const worker = require('./shared/test/mocks/browser');
  worker.start();
}

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(
    <Main />
  );
});
