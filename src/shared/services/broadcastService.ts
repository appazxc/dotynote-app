// Broadcast service for cross-tab authentication synchronization
// Uses native BroadcastChannel API for secure same-origin communication

export interface BroadcastMessage {
  type: 'TOKEN_UPDATE' | 'LOGOUT';
  payload: any;
  timestamp: number;
  sourceTab: string;
  messageId: string;
}

export interface TokenUpdatePayload {
  token: string;
  refreshToken: string;
}

export interface LogoutPayload {
  reason?: string;
}

export interface BroadcastService {
  postMessage(message: BroadcastMessage): void;
  addEventListener(callback: (message: BroadcastMessage) => void): () => void;
  destroy(): void;
  isSupported(): boolean;
}

class BroadcastAuthService implements BroadcastService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(message: BroadcastMessage) => void> = new Set();
  private tabId: string;
  private isDestroyed = false;
  private messageHistory: Set<string> = new Set();
  private readonly HISTORY_SIZE = 100;

  constructor(channelName = 'dotynote-sync') {
    this.tabId = this.generateTabId();
    
    // Check if BroadcastChannel is supported
    if (typeof BroadcastChannel === 'undefined') {
      console.warn('[BroadcastService] BroadcastChannel not supported in this browser');
      return;
    }

    try {
      this.channel = new BroadcastChannel(channelName);
      this.channel.onmessage = this.handleMessage.bind(this);
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        this.destroy();
      });
      
      console.log('[BroadcastService] Initialized for tab:', this.tabId);
    } catch (error) {
      console.error('[BroadcastService] Failed to create BroadcastChannel:', error);
    }
  }

  private generateTabId(): string {
    return `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleMessage(event: MessageEvent<BroadcastMessage>): void {
    if (this.isDestroyed || !event.data) return;

    const message = event.data;
    
    // Skip messages from the same tab
    if (message.sourceTab === this.tabId) return;
    
    // Skip duplicate messages
    if (this.messageHistory.has(message.messageId)) return;
    
    // Add to history and maintain size limit
    this.messageHistory.add(message.messageId);
    if (this.messageHistory.size > this.HISTORY_SIZE) {
      const firstItem = this.messageHistory.values().next().value;
      if (firstItem) {
        this.messageHistory.delete(firstItem);
      }
    }

    // Validate message structure
    if (!this.isValidMessage(message)) {
      console.warn('[BroadcastService] Invalid message received:', message);
      return;
    }

    console.log('[BroadcastService] Received message:', message.type, 'from tab:', message.sourceTab);
    
    // Notify all listeners
    this.listeners.forEach(callback => {
      try {
        callback(message);
      } catch (error) {
        console.error('[BroadcastService] Error in message listener:', error);
      }
    });
  }

  private isValidMessage(message: any): message is BroadcastMessage {
    return (
      message &&
      typeof message === 'object' &&
      ['TOKEN_UPDATE', 'LOGOUT', 'TOKEN_REFRESH'].includes(message.type) &&
      typeof message.timestamp === 'number' &&
      typeof message.sourceTab === 'string' &&
      typeof message.messageId === 'string' &&
      message.payload !== undefined
    );
  }

  postMessage(message: Omit<BroadcastMessage, 'timestamp' | 'sourceTab' | 'messageId'>): void {
    if (this.isDestroyed || !this.channel || !this.isSupported()) {
      console.warn('[BroadcastService] Cannot post message: service destroyed or not supported');
      return;
    }

    const fullMessage: BroadcastMessage = {
      ...message,
      timestamp: Date.now(),
      sourceTab: this.tabId,
      messageId: this.generateMessageId(),
    };

    try {
      this.channel.postMessage(fullMessage);
      console.log('[BroadcastService] Posted message:', message.type, 'from tab:', this.tabId);
    } catch (error) {
      console.error('[BroadcastService] Failed to post message:', error);
    }
  }

  addEventListener(callback: (message: BroadcastMessage) => void): () => void {
    if (typeof callback !== 'function') {
      console.warn('[BroadcastService] Callback must be a function');
      return () => {};
    }

    this.listeners.add(callback);
    
    // Return cleanup function
    return () => {
      this.listeners.delete(callback);
    };
  }

  destroy(): void {
    if (this.isDestroyed) return;
    
    this.isDestroyed = true;
    this.listeners.clear();
    this.messageHistory.clear();
    
    if (this.channel) {
      try {
        this.channel.close();
        this.channel = null;
      } catch (error) {
        console.error('[BroadcastService] Error closing BroadcastChannel:', error);
      }
    }
    
    console.log('[BroadcastService] Destroyed for tab:', this.tabId);
  }

  isSupported(): boolean {
    return typeof BroadcastChannel !== 'undefined' && !this.isDestroyed;
  }

  // Utility methods for specific message types
  broadcastTokenUpdate(token: string, refreshToken: string): void {
    this.postMessage({
      type: 'TOKEN_UPDATE',
      payload: { token, refreshToken } as TokenUpdatePayload,
    });
  }

  broadcastLogout(reason?: string): void {
    this.postMessage({
      type: 'LOGOUT',
      payload: { reason } as LogoutPayload,
    });
  }
}

// Singleton instance
let broadcastServiceInstance: BroadcastAuthService | null = null;

export const getBroadcastService = (): BroadcastAuthService | null => {
  if (!broadcastServiceInstance) {
    broadcastServiceInstance = new BroadcastAuthService();
  }
  return broadcastServiceInstance;
};

export const destroyBroadcastService = (): void => {
  if (broadcastServiceInstance) {
    broadcastServiceInstance.destroy();
    broadcastServiceInstance = null;
  }
};

export default getBroadcastService;
