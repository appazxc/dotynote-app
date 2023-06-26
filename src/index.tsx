import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { store } from 'shared/state/store';
import { initialize } from 'shared/core//actions/initializeActions';

import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

store.dispatch(initialize());

root.render(
  <Main />
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
