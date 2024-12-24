import * as ReactDOM from 'react-dom/client';

import 'react-photo-album/rows.css';
import { initialize } from 'shared/core/actions/initializeActions';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(<Main />);
});
