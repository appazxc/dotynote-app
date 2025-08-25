import { selectToken } from 'shared/selectors/auth/selectToken';
import { logger } from 'shared/services/logger';
import { ThunkAction } from 'shared/types/store';

type Params<T> = {
  url: string;
  onMessage: (data: T, closeConnection: () => void) => void;
  onClose?: () => void; // Connection close handler
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
    const lines = chunk.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Process only data lines in SSE format
      if (trimmedLine.startsWith('data: ')) {
        const messageData = trimmedLine.slice(6); // Remove 'data: ' prefix
        
        try { 
          onMessage(JSON.parse(messageData) as T, closeConnection);
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error('SSE message processing failed', error, {
              errorCategory: 'api_error',
              severity: 'high',
              action: 'sse_message_parse',
              extra: {
                rawMessage: messageData,
                fullLine: trimmedLine,
                chunk: chunk,
                url: url,
                messageLength: messageData.length,
              },
            });
          }
          throw error;
        }
      }
      // Ignore other SSE lines (comments, event types, etc.)
    }
  }
};