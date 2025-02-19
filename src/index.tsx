import * as ReactDOM from 'react-dom/client';

import 'react-photo-album/styles.css';
import 'yet-another-react-lightbox/styles.css';
// import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/video.css';
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { initialize } from 'shared/core/actions/initializeActions';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(<Main />);
});
