// React hook for broadcast authentication synchronization
// Provides easy integration with React components and Redux store

import { useCallback, useEffect, useRef } from 'react';

import { logout } from 'shared/actions/logout';
import {
  BroadcastMessage,
  getBroadcastService,
  TokenUpdatePayload,
} from 'shared/services/broadcastService';
import { logger } from 'shared/services/logger';
import { useAppDispatch } from 'shared/store/hooks';
import { setRefreshToken, setToken } from 'shared/store/slices/authSlice';

export const useBroadcast = () => {
  const dispatch = useAppDispatch();
  const broadcastService = getBroadcastService();
  const cleanupRef = useRef<(() => void) | null>(null);

  // Handle incoming broadcast messages
  const handleBroadcastMessage = useCallback((message: BroadcastMessage) => {
    const { type, sourceTab, timestamp, payload } = message;
    logger.info('Broadcast message received', {
      extra: {
        messageType: type,
        sourceTab,
        timestamp,
      },
    });

    switch (message.type) {
    case 'TOKEN_UPDATE': {
      const tokenUpdatePayload = payload as TokenUpdatePayload;
          
      // Update Redux store
      dispatch(setToken(tokenUpdatePayload.token));
      dispatch(setRefreshToken(tokenUpdatePayload.refreshToken));
          
      logger.info('Token updated from broadcast', {
        extra: {
          sourceTab: message.sourceTab,
          hasToken: !!payload.token,
          hasRefreshToken: !!payload.refreshToken,
        },
      });
      break;
    }

    case 'LOGOUT': {
      dispatch(logout(false, true));
          
      logger.info('Logout triggered from broadcast', {
        extra: {
          sourceTab: message.sourceTab,
          reason: payload.reason,
        },
      });
      break;
    }
    default:
      logger.warn('Unknown broadcast message type', {
        extra: {
          messageType: message.type,
          sourceTab: message.sourceTab,
        },
      });
    }
  }, [dispatch]);

  // Setup broadcast listener
  useEffect(() => {
    if (!broadcastService || !broadcastService.isSupported()) {
      logger.warn('BroadcastChannel not supported, skipping broadcast setup');
      return;
    }

    // Add event listener and store cleanup function
    cleanupRef.current = broadcastService.addEventListener(handleBroadcastMessage);
    
    logger.info('Broadcast auth listener setup complete');

    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
        logger.info('Broadcast auth listener cleaned up');
      }
    };
  }, [broadcastService, handleBroadcastMessage]);
};

export default useBroadcast;
