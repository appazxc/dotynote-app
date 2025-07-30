import * as Sentry from '@sentry/react';

import { ContextProvider } from './ContextProvider';
import type { 
  ILogger, 
  LogLevel, 
  LogContext, 
  LoggerConfig, 
  PerformanceMetrics, 
  Transaction,
  ErrorCategory,
} from './types';

/**
 * Enterprise-grade centralized logging service
 * Provides unified interface for error tracking, performance monitoring, and structured logging
 */
export class LoggerService implements ILogger {
  private contextProvider: ContextProvider;
  private config: LoggerConfig;
  private scopedContext: Partial<LogContext>;

  constructor(config: LoggerConfig = {}, scopedContext: Partial<LogContext> = {}) {
    this.contextProvider = ContextProvider.getInstance();
    this.config = {
      enableConsoleLogging: true,
      enableSentryLogging: true,
      logLevel: 'info',
      performanceTracking: true,
      maxBreadcrumbs: 50,
      ...config,
    };
    this.scopedContext = scopedContext;
  }

  /**
   * Log error with automatic context enrichment
   */
  public error(message: string, error?: Error, context?: Partial<LogContext>): void {
    const enrichedContext = this.buildFullContext('error', context, error);
    
    this.logToConsole('error', message, error, enrichedContext);
    
    if (this.config.enableSentryLogging) {
      if (error) {
        Sentry.captureException(error, {
          tags: this.buildSentryTags(enrichedContext),
          extra: enrichedContext.extra,
          level: 'error',
          fingerprint: enrichedContext.fingerprint,
          contexts: {
            context: this.sanitizeContext(enrichedContext),
          },
        });
      } else {
        Sentry.captureMessage(message, {
          level: 'error',
          tags: this.buildSentryTags(enrichedContext),
          extra: enrichedContext.extra,
          fingerprint: enrichedContext.fingerprint,
        });
      }
    }
  }

  /**
   * Log warning message
   */
  public warn(message: string, context?: Partial<LogContext>): void {
    const enrichedContext = this.buildFullContext('warn', context);
    
    this.logToConsole('warn', message, undefined, enrichedContext);
    
    if (this.config.enableSentryLogging) {
      Sentry.captureMessage(message, {
        level: 'warning',
        tags: this.buildSentryTags(enrichedContext),
        extra: enrichedContext.extra,
      });
    }
  }

  /**
   * Log info message
   */
  public info(message: string, context?: Partial<LogContext>): void {
    const enrichedContext = this.buildFullContext('info', context);
    
    this.logToConsole('info', message, undefined, enrichedContext);
    
    if (this.config.enableSentryLogging && this.shouldLogLevel('info')) {
      Sentry.captureMessage(message, {
        level: 'info',
        tags: this.buildSentryTags(enrichedContext),
        extra: enrichedContext.extra,
      });
    }
  }

  /**
   * Log debug message
   */
  public debug(message: string, context?: Partial<LogContext>): void {
    if (!this.shouldLogLevel('debug')) return;
    
    const enrichedContext = this.buildFullContext('debug', context);
    
    this.logToConsole('debug', message, undefined, enrichedContext);
    
    // Debug messages are typically not sent to Sentry in production
    const isDevelopment = typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'development';
    if (this.config.enableSentryLogging && isDevelopment) {
      Sentry.captureMessage(message, {
        level: 'debug',
        tags: this.buildSentryTags(enrichedContext),
        extra: enrichedContext.extra,
      });
    }
  }

  /**
   * Start performance transaction
   */
  public startTransaction(name: string, context?: Partial<LogContext>): Transaction {
    const enrichedContext = this.buildFullContext('info', context);
    const startTime = performance.now();

    if (this.config.performanceTracking && this.config.enableSentryLogging) {
      // Use Sentry's newer transaction API
      const transaction = Sentry.startSpan({ name }, () => {
        return {
          name,
          startTime,
          finish: () => {
            // Transaction finishes automatically with span
          },
          setTag: (key: string, value: string) => {
            Sentry.getCurrentScope().setTag(key, value);
          },
          setData: (key: string, value: any) => {
            Sentry.getCurrentScope().setContext('transaction_data', { [key]: value });
          },
        };
      });
      return transaction;
    }

    // Fallback transaction for when Sentry is disabled
    return {
      name,
      startTime,
      finish: () => {
        const duration = performance.now() - startTime;
        this.debug(`Transaction completed: ${name}`, {
          ...context,
          extra: { duration: `${duration.toFixed(2)}ms` },
        });
      },
      setTag: () => {},
      setData: () => {},
    };
  }

  /**
   * Capture performance metrics
   */
  public capturePerformance(metrics: PerformanceMetrics): void {
    const duration = metrics.duration || (metrics.endTime ? metrics.endTime - metrics.startTime : 0);
    
    const context: Partial<LogContext> = {
      extra: {
        operationType: metrics.operationType,
        operationName: metrics.operationName,
        duration: `${duration.toFixed(2)}ms`,
        ...metrics.metadata,
      },
      errorCategory: 'performance',
    };

    this.info(`Performance: ${metrics.operationName}`, context);
  }

  /**
   * Create scoped logger with additional context
   */
  public withContext(context: Partial<LogContext>): ILogger {
    return new LoggerService(this.config, {
      ...this.scopedContext,
      ...context,
    });
  }

  /**
   * Create scoped logger with module context
   */
  public withModule(moduleName: string): ILogger {
    return this.withContext({ module: moduleName });
  }

  /**
   * Create scoped logger with component context
   */
  public withComponent(componentName: string): ILogger {
    return this.withContext({ component: componentName });
  }

  /**
   * Create scoped logger with error category
   */
  public withCategory(category: ErrorCategory): ILogger {
    return this.withContext({ errorCategory: category });
  }

  /**
   * Set user context for all future logs
   */
  public setUser(user: { id?: string; email?: string; username?: string }): void {
    this.contextProvider.setGlobalContext({
      userId: user.id,
      tags: {
        ...this.contextProvider.getGlobalContext().tags,
        user_email: user.email || 'unknown',
        user_username: user.username || 'unknown',
      },
    });

    if (this.config.enableSentryLogging) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      });
    }
  }

  /**
   * Add breadcrumb for debugging
   */
  public addBreadcrumb(message: string, category = 'default', level: LogLevel = 'info'): void {
    if (this.config.enableSentryLogging) {
      Sentry.addBreadcrumb({
        message,
        category,
        level: level as Sentry.SeverityLevel,
        timestamp: Date.now() / 1000,
      });
    }

    if (this.config.enableConsoleLogging && this.shouldLogLevel('debug')) {
      console.log(`[Breadcrumb:${category}] ${message}`);
    }
  }

  /**
   * Build full enriched context
   */
  private buildFullContext(
    level: LogLevel,
    providedContext?: Partial<LogContext>,
    error?: Error
  ): LogContext {
    const baseContext = this.contextProvider.buildEnrichedContext(
      {
        ...this.scopedContext,
        ...providedContext,
      },
      error
    );

    return {
      ...baseContext,
      // Add timestamp and request ID
      extra: {
        timestamp: new Date().toISOString(),
        logLevel: level,
        requestId: this.contextProvider.generateRequestId(),
        ...baseContext.extra,
      },
    };
  }

  /**
   * Build Sentry tags from context
   */
  private buildSentryTags(context: LogContext): Record<string, string> {
    const tags: Record<string, string> = {};

    if (context.module) tags.module = context.module;
    if (context.component) tags.component = context.component;
    if (context.errorCategory) tags.category = context.errorCategory;
    if (context.route) tags.route = context.route;
    if (context.action) tags.action = context.action;
    if (context.severity) tags.severity = context.severity;

    // Add custom tags
    if (context.tags) {
      Object.entries(context.tags).forEach(([key, value]) => {
        tags[key] = String(value);
      });
    }

    return tags;
  }

  /**
   * Sanitize context for Sentry (remove sensitive data)
   */
  private sanitizeContext(context: LogContext): Record<string, any> {
    const { tags, extra, fingerprint, ...sanitized } = context;
    return sanitized;
  }

  /**
   * Check if log level should be logged based on config
   */
  private shouldLogLevel(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const configLevel = this.config.logLevel || 'info';
    
    return levels.indexOf(level) >= levels.indexOf(configLevel);
  }

  /**
   * Log to console with structured format
   */
  private logToConsole(
    level: LogLevel,
    message: string,
    error?: Error,
    context?: LogContext
  ): void {
    if (!this.config.enableConsoleLogging || !this.shouldLogLevel(level)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const module = context?.module || 'unknown';
    const prefix = `[${timestamp}] [${level.toUpperCase()}] [${module}]`;

    switch (level) {
    case 'error':
      console.error(prefix, message, error || '', context);
      break;
    case 'warn':
      console.warn(prefix, message, context);
      break;
    case 'info':
      console.info(prefix, message, context);
      break;
    case 'debug':
      console.debug(prefix, message, context);
      break;
    }
  }
} 