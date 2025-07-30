import config from 'shared/config';
import { LoggerService } from 'shared/services/logger/LoggerService';

import type { LogContext, PerformanceMetrics, LogLevel, LoggerConfig } from './types'; 

export type { 
  ILogger, 
  LogLevel, 
  LogContext, 
  LoggerConfig, 
  ErrorCategory, 
  PerformanceMetrics, 
  Transaction, 
} from './types';

export { LoggerService } from './LoggerService';
export { ContextProvider } from './ContextProvider';

/**
 * Global logger instance for the application
 * Pre-configured with application settings
 */
const createGlobalLogger = (): LoggerService => {
  const loggerConfig: LoggerConfig = {
    enableConsoleLogging: true,
    enableSentryLogging: config.logging?.sentry?.enable || false,
    logLevel: import.meta.env.MODE === 'development' ? 'debug' : 'info',
    performanceTracking: true,
    maxBreadcrumbs: 50,
  };

  return new LoggerService(loggerConfig);
};

/**
 * Global logger instance - use this for most logging needs
 * 
 * @example
 * ```typescript
 * import { logger } from 'shared/services/logger';
 * 
 * // Simple error logging
 * logger.error('Something went wrong', error);
 * 
 * // With context
 * logger.error('API request failed', error, { 
 *   action: 'fetch_user_data',
 *   extra: { userId: 123 }
 * });
 * 
 * // Scoped logging
 * const componentLogger = logger.withComponent('UserProfile');
 * componentLogger.info('Component mounted');
 * ```
 */
export const logger = createGlobalLogger();

/**
 * Create a scoped logger for a specific module/component
 * Useful for libraries or large components that need consistent logging context
 * 
 * @example
 * ```typescript
 * import { createScopedLogger } from 'shared/services/logger';
 * 
 * const apiLogger = createScopedLogger({
 *   module: 'ApiService',
 *   errorCategory: 'api_error'
 * });
 * 
 * apiLogger.error('Request failed', error);
 * ```
 */
export const createScopedLogger = (context: Partial<LogContext>): LoggerService => {
  const loggerConfig: LoggerConfig = {
    enableConsoleLogging: true,
    enableSentryLogging: config.logging?.sentry?.enable || false,
    logLevel: import.meta.env.MODE === 'development' ? 'debug' : 'info',
    performanceTracking: true,
    maxBreadcrumbs: 50,
  };

  return new LoggerService(loggerConfig, context);
};

/**
 * Convenience method for quick error logging
 * Automatically categorizes as UI error and extracts module from call stack
 * 
 * @example
 * ```typescript
 * import { logError } from 'shared/services/logger';
 * 
 * try {
 *   // some operation
 * } catch (error) {
 *   logError('Operation failed', error);
 * }
 * ```
 */
export const logError = (message: string, error: Error, context?: Partial<LogContext>) => {
  logger.error(message, error, {
    errorCategory: 'ui_error',
    severity: 'medium',
    ...context,
  });
};

/**
 * Convenience method for API error logging
 * Pre-configured for API-related errors
 * 
 * @example
 * ```typescript
 * import { logApiError } from 'shared/services/logger';
 * 
 * try {
 *   await api.fetchUser();
 * } catch (error) {
 *   logApiError('Failed to fetch user', error, { 
 *     extra: { endpoint: '/api/user' }
 *   });
 * }
 * ```
 */
export const logApiError = (message: string, error: Error, context?: Partial<LogContext>) => {
  logger.error(message, error, {
    errorCategory: 'api_error',
    severity: 'high',
    ...context,
  });
};

/**
 * Convenience method for performance logging
 * 
 * @example
 * ```typescript
 * import { logPerformance } from 'shared/services/logger';
 * 
 * const startTime = performance.now();
 * // ... do some operation
 * const endTime = performance.now();
 * 
 * logPerformance({
 *   operationType: 'component_render',
 *   operationName: 'UserList',
 *   startTime,
 *   endTime
 * });
 * ```
 */
export const logPerformance = (metrics: PerformanceMetrics) => {
  logger.capturePerformance(metrics);
};

/**
 * Migration helpers for existing Sentry code
 * These provide backward compatibility while transitioning to the new logger
 */
export const migration = {
  /**
   * Drop-in replacement for Sentry.captureException
   * 
   * @example
   * ```typescript
   * // Before:
   * Sentry.captureException(error, { tags: { module: 'Component' } });
   * 
   * // After:
   * migration.captureException(error, { tags: { module: 'Component' } });
   * ```
   */
  captureException: (error: Error, sentryOptions?: { tags?: Record<string, any> }) => {
    const module = sentryOptions?.tags?.module;
    const context: Partial<LogContext> = {
      module: module ? String(module) : undefined,
      tags: sentryOptions?.tags,
    };
    
    logger.error('Exception occurred', error, context);
  },

  /**
   * Drop-in replacement for Sentry.captureMessage
   * 
   * @example
   * ```typescript
   * // Before:
   * Sentry.captureMessage('Message', { level: 'info', tags: { module: 'Api' } });
   * 
   * // After:
   * migration.captureMessage('Message', { level: 'info', tags: { module: 'Api' } });
   * ```
   */
  captureMessage: (
    message: string, 
    sentryOptions?: { 
      level?: string; 
      tags?: Record<string, any>;
      extra?: Record<string, any>;
    }
  ) => {
    const level = sentryOptions?.level as LogLevel || 'info';
    const module = sentryOptions?.tags?.module;
    const context: Partial<LogContext> = {
      module: module ? String(module) : undefined,
      tags: sentryOptions?.tags,
      extra: sentryOptions?.extra,
    };

    switch (level) {
    case 'error':
      logger.error(message, undefined, context);
      break;
    case 'warn':
      logger.warn(message, context);
      break;
    case 'info':
      logger.info(message, context);
      break;
    case 'debug':
      logger.debug(message, context);
      break;
    default:
      logger.info(message, context);
    }
  },
};
