import * as Sentry from '@sentry/react';

import { selectToken } from 'shared/selectors/auth/selectToken';
import { ThunkAction } from 'shared/types/store';

type Params<T> = {
  url: string;
  onMessage: (data: T, closeConnection: () => void) => void;
  onClose?: () => void; // Обработчик закрытия соединения
}

export const connectSSE = <T>(params: Params<T>): ThunkAction => async (_, getState) => {
  const { url, onMessage, onClose } = params;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${selectToken(getState())}`,
    },
  });

  if (!response.body) {
    throw new Error('SSE: No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let isActive = true;

  const closeConnection = () => {
    isActive = false;
    reader.cancel();
    onClose?.();
  };

  while (isActive) {
    const { done, value } = await reader.read();
    if (done) {
      onClose?.();
      break;
    }
    const chunk = decoder.decode(value, { stream: true });
    const messages = chunk
      .split('\n')
      .filter(msg => msg.trim());
    
    for (const message of messages) {
      try {
        onMessage(JSON.parse(message) as T, closeConnection);
      } catch (error) {
        Sentry.captureException(error, {
          extra: {
            rawMessage: message,
            chunk: message,
            url: url,
          },
        });
        throw error;
      }
    }
  }
};