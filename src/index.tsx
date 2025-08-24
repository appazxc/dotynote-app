import { PostHogProvider } from 'posthog-js/react';
import * as ReactDOM from 'react-dom/client';
import 'react-photo-album/styles.css';
import 'yet-another-react-lightbox/styles.css';

import { initialize } from 'shared/core/actions/initializeActions';

import Main from './shared/core';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2025-05-24',
  ui_host: 'https://eu.posthog.com',
} as const;

const root = ReactDOM.createRoot(container);

initialize().then(() => {
  root.render(
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <Main />
    </PostHogProvider>
  );
});
