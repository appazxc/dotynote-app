import type { LogContext, ErrorCategory } from './types';

/**
 * Context Provider for automatic context enrichment
 * Provides automatic module detection, user context, and route information
 */
export class ContextProvider {
  private static instance: ContextProvider;
  private globalContext: Partial<LogContext> = {};

  private constructor() {}

  public static getInstance(): ContextProvider {
    if (!ContextProvider.instance) {
      ContextProvider.instance = new ContextProvider();
    }
    return ContextProvider.instance;
  }

  /**
   * Set global context that will be included in all logs
   */
  public setGlobalContext(context: Partial<LogContext>): void {
    this.globalContext = { ...this.globalContext, ...context };
  }

  /**
   * Get current global context
   */
  public getGlobalContext(): Partial<LogContext> {
    return { ...this.globalContext };
  }

  /**
   * Extract module name from call stack
   * Tries to identify the calling module/component from the stack trace
   */
  public extractModuleFromStack(): string | undefined {
    try {
      const stack = new Error().stack;
      if (!stack) return undefined;

      const stackLines = stack.split('\n');
      
      // Skip first few lines (Error constructor, this method, logger method)
      for (let i = 3; i < Math.min(stackLines.length, 8); i++) {
        const line = stackLines[i];
        
        // Look for src/ paths in the stack
        const srcMatch = line.match(/src\/([^\/]+)\/([^\/]+)\/([^\/\s\)]+)/);
        if (srcMatch) {
          const [, platform, moduleType, fileName] = srcMatch;
          
          // Clean up file name (remove .tsx, .ts extensions)
          const cleanFileName = fileName.replace(/\.(tsx?|jsx?)$/, '');
          
          // Return meaningful module name
          if (moduleType === 'components' || moduleType === 'modules') {
            return `${platform}/${cleanFileName}`;
          } else if (moduleType === 'routes') {
            return `${platform}/routes/${cleanFileName}`;
          } else {
            return `${platform}/${moduleType}`;
          }
        }

        // Fallback: look for any component/module patterns
        const componentMatch = line.match(/\/([A-Z][a-zA-Z]+)\.(tsx?|jsx?)/);
        if (componentMatch) {
          return componentMatch[1];
        }
      }
    } catch (error) {
      // Silently fail module detection
    }
    
    return undefined;
  }

  /**
   * Extract component name from call stack
   */
  public extractComponentFromStack(): string | undefined {
    try {
      const stack = new Error().stack;
      if (!stack) return undefined;

      const stackLines = stack.split('\n');
      
      for (let i = 3; i < Math.min(stackLines.length, 6); i++) {
        const line = stackLines[i];
        
        // Look for React component patterns
        const componentMatch = line.match(/\/([A-Z][a-zA-Z]+)\.tsx?/);
        if (componentMatch) {
          return componentMatch[1];
        }
      }
    } catch (error) {
      // Silently fail component detection
    }
    
    return undefined;
  }

  /**
   * Get current route information
   * This can be enhanced with actual router integration
   */
  public getCurrentRoute(): string | undefined {
    try {
      if (typeof window !== 'undefined') {
        return window.location.pathname;
      }
    } catch (error) {
      // Silently fail route detection
    }
    
    return undefined;
  }

  /**
   * Generate session ID for tracking user sessions
   */
  public getSessionId(): string {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('logger_session_id');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('logger_session_id', sessionId);
      }
      return sessionId;
    }
    return `server_session_${Date.now()}`;
  }

  /**
   * Generate request ID for tracking individual requests/operations
   */
  public generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Automatically categorize error based on context
   */
  public categorizeError(error?: Error, context?: Partial<LogContext>): ErrorCategory {
    // If category is explicitly provided, use it
    if (context?.errorCategory) {
      return context.errorCategory;
    }

    // Auto-categorize based on error type and stack
    if (error) {
      const errorMessage = error.message?.toLowerCase() || '';
      const errorStack = error.stack?.toLowerCase() || '';

      // API/Network errors
      if (errorMessage.includes('fetch') || 
          errorMessage.includes('network') || 
          errorMessage.includes('request') ||
          errorMessage.includes('axios') ||
          errorStack.includes('apiFactory')) {
        return 'api_error';
      }

      // Authentication errors
      if (errorMessage.includes('unauthorized') || 
          errorMessage.includes('authentication') ||
          errorMessage.includes('token') ||
          errorMessage.includes('login')) {
        return 'authentication';
      }

      // Validation errors
      if (errorMessage.includes('validation') || 
          errorMessage.includes('invalid') ||
          errorMessage.includes('required')) {
        return 'validation';
      }

      // React/UI errors
      if (errorStack.includes('react') || 
          errorStack.includes('component') ||
          errorMessage.includes('render')) {
        return 'ui_error';
      }
    }

    // Categorize based on module context
    const module = context?.module || this.extractModuleFromStack();
    if (module) {
      if (module.includes('api') || module.includes('Api')) {
        return 'api_error';
      }
      if (module.includes('auth') || module.includes('login')) {
        return 'authentication';
      }
      if (module.includes('component') || module.includes('Component')) {
        return 'ui_error';
      }
    }

    return 'unknown';
  }

  /**
   * Build enriched context by combining all available information
   */
  public buildEnrichedContext(
    providedContext?: Partial<LogContext>,
    error?: Error
  ): LogContext {
    const autoModule = this.extractModuleFromStack();
    const autoComponent = this.extractComponentFromStack();
    const route = this.getCurrentRoute();
    const sessionId = this.getSessionId();
    const category = this.categorizeError(error, providedContext);

    return {
      ...this.globalContext,
      ...providedContext,
      module: providedContext?.module || autoModule,
      component: providedContext?.component || autoComponent,
      route: providedContext?.route || route,
      sessionId: providedContext?.sessionId || sessionId,
      errorCategory: category,
      // Generate fingerprint for similar error grouping
      fingerprint: providedContext?.fingerprint || (error ? [
        error.name,
        autoModule || 'unknown_module',
      ] : undefined),
    };
  }
} 