import * as Sentry from '@sentry/react';

import config from 'shared/config';
import { getStore } from 'shared/helpers/store/getStore';
import { selectUser } from 'shared/selectors/user/selectUser';
import { logger } from 'shared/services/logger';

const beforeSend = (event: Sentry.ErrorEvent) => {
  const state = getStore().getState();
  const user = selectUser(state);

  event.user = {
    id: user?.id,
    email: user?.email,
    nickname: user?.nickname,
    username: user?.username,
  };
  // Add any other information you want to send
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

  // Initialize logger with user context when available
  const state = getStore().getState();
  const user = selectUser(state);
  
  if (user) {
    logger.setUser({
      id: user.id,
      email: user.email,
      username: user.username || user.nickname || undefined,
    });
  }

  // Subscribe to user changes to keep logger context updated
  let previousUser = user;
  getStore().subscribe(() => {
    const currentState = getStore().getState();
    const currentUser = selectUser(currentState);
    
    // Only update if user actually changed
    if (currentUser !== previousUser) {
      if (currentUser) {
        logger.setUser({
          id: currentUser.id,
          email: currentUser.email,
          username: currentUser.username || currentUser.nickname || undefined,
        });
      }
      previousUser = currentUser;
    }
  });
};