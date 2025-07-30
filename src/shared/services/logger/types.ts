export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type ErrorCategory = 
  | 'ui_error' // React component errors, rendering issues
  | 'api_error' // HTTP requests, network issues  
  | 'business_logic' // Application logic errors
  | 'performance' // Performance related issues
  | 'authentication' // Auth/login related errors
  | 'validation' // Form/data validation errors
  | 'unknown'; // Fallback category

export interface LogContext {
  module?: string;
  component?: string;
  action?: string;
  userId?: string;
  route?: string;
  requestId?: string;
  sessionId?: string;
  errorCategory?: ErrorCategory;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  tags?: Record<string, string | number | boolean>;
  extra?: Record<string, any>;
  fingerprint?: string[];
}

export interface PerformanceMetrics {
  startTime: number;
  endTime?: number;
  duration?: number;
  operationType: string;
  operationName: string;
  metadata?: Record<string, any>;
}

export interface Transaction {
  name: string;
  startTime: number;
  finish(): void;
  setTag(key: string, value: string): void;
  setData(key: string, value: any): void;
}

export interface ILogger {
  // Standard logging methods
  error(message: string, error?: Error, context?: Partial<LogContext>): void;
  warn(message: string, context?: Partial<LogContext>): void;
  info(message: string, context?: Partial<LogContext>): void;
  debug(message: string, context?: Partial<LogContext>): void;

  // Performance monitoring
  startTransaction(name: string, context?: Partial<LogContext>): Transaction;
  capturePerformance(metrics: PerformanceMetrics): void;

  // Scoped logging (creates new logger instance with preset context)
  withContext(context: Partial<LogContext>): ILogger;
  withModule(moduleName: string): ILogger;
  withComponent(componentName: string): ILogger;
  withCategory(category: ErrorCategory): ILogger;

  // Utility methods
  setUser(user: { id?: string; email?: string; username?: string }): void;
  addBreadcrumb(message: string, category?: string, level?: LogLevel): void;
}

export interface LoggerConfig {
  enableConsoleLogging?: boolean;
  enableSentryLogging?: boolean;
  logLevel?: LogLevel;
  defaultContext?: Partial<LogContext>;
  performanceTracking?: boolean;
  maxBreadcrumbs?: number;
} 