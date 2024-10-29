import * as Sentry from '@sentry/react';

import config from 'shared/config';

export const setupSentry = () => {
  if (!config.logging?.sentry?.enable) {
    return;
  }

  Sentry.init({
    dsn: config.logging.sentry.dsn,
    environment: import.meta.env.MODE || 'development',
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    replaysSessionSampleRate: 0.1, 
    replaysOnErrorSampleRate: 1.0,
  });
};