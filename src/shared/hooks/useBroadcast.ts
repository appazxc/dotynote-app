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
    const { payload } = message;

    switch (message.type) {
    case 'TOKEN_UPDATE': {
      const tokenUpdatePayload = payload as TokenUpdatePayload;
      dispatch(setToken(tokenUpdatePayload.token));
      dispatch(setRefreshToken(tokenUpdatePayload.refreshToken));
      break;
    }

    case 'LOGOUT': {
      dispatch(logout(false, true));
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
    
    // Cleanup on unmount
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [broadcastService, handleBroadcastMessage]);
};

export default useBroadcast;
