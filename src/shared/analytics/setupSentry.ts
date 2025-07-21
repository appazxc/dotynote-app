import * as Sentry from '@sentry/react';

import config from 'shared/config';
import { getStore } from 'shared/helpers/store/getStore';
import { selectUser } from 'shared/selectors/user/selectUser';

const beforeSend = (event: Sentry.ErrorEvent) => {
  const state = getStore().getState();
  const user = selectUser(state);

  event.user = {
    id: user?.id,
    email: user?.email,
    nickname: user?.nickname,
    username: user?.username,
  };
  // Добавьте любую другую информацию, которую хотите отправить
  return event;
};

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
    beforeSend,
    replaysSessionSampleRate: 0.1, 
    replaysOnErrorSampleRate: 1.0,
    tracePropagationTargets: ['localhost', /^https:\/\/dotynote\.com\/api/],
  });
};