/**
 * Examples of using the centralized logging system
 * This file serves as documentation and can be deleted after developers are familiar with the API
 */

import { logger, logError, logApiError, createScopedLogger, migration } from './index';

// ===============================
// BASIC USAGE EXAMPLES
// ===============================

// Simple error logging (automatically detects module and categorizes error)
const handleError = (error: Error) => {
  logger.error('Something went wrong', error);
};

// Error logging with additional context
const handleApiError = (error: Error, userId: string) => {
  logger.error('API request failed', error, {
    action: 'fetch_user_data',
    severity: 'high',
    extra: { userId, endpoint: '/api/user' },
  });
};

// Info logging with context
const trackUserAction = (action: string) => {
  logger.info('User performed action', {
    action,
    severity: 'low',
    extra: { timestamp: Date.now() },
  });
};

// ===============================
// SCOPED LOGGING EXAMPLES  
// ===============================

// Create a logger for a specific component
const UserProfileLogger = logger.withComponent('UserProfile');

// Use the scoped logger
const handleProfileUpdate = (error?: Error) => {
  if (error) {
    UserProfileLogger.error('Profile update failed', error);
  } else {
    UserProfileLogger.info('Profile updated successfully');
  }
};

// Create a scoped logger for API module
const apiLogger = createScopedLogger({
  module: 'ApiService',
  errorCategory: 'api_error',
});

const fetchUserData = async (userId: string) => {
  const transaction = apiLogger.startTransaction('fetch_user_data');
  
  try {
    // ... API call
    transaction.setTag('user_id', userId);
    transaction.setData('success', true);
    apiLogger.info('User data fetched successfully', {
      extra: { userId },
    });
  } catch (error) {
    apiLogger.error('Failed to fetch user data', error as Error, {
      extra: { userId },
    });
    throw error;
  } finally {
    transaction.finish();
  }
};

// ===============================
// CONVENIENCE FUNCTIONS EXAMPLES
// ===============================

// Quick error logging for UI components
const handleComponentError = (error: Error) => {
  logError('Component render failed', error, {
    component: 'UserList',
    extra: { itemCount: 50 },
  });
};

// Quick API error logging
const handleApiFailure = (error: Error) => {
  logApiError('API call failed', error, {
    extra: { 
      endpoint: '/api/notes',
      method: 'POST',
    },
  });
};

// ===============================
// PERFORMANCE MONITORING EXAMPLES
// ===============================

// Manual performance tracking
const performanceExample = () => {
  const startTime = performance.now();
  
  // ... do some expensive operation
  
  const endTime = performance.now();
  
  logger.capturePerformance({
    operationType: 'component_render',
    operationName: 'NoteList',
    startTime,
    endTime,
    metadata: {
      itemCount: 100,
      hasFilters: true,
    },
  });
};

// Transaction-based performance tracking
const transactionExample = async () => {
  const transaction = logger.startTransaction('load_note_data');
  
  try {
    transaction.setTag('note_id', '123');
    transaction.setData('cache_hit', false);
    
    // ... load data
    
    transaction.setData('success', true);
  } catch (error) {
    transaction.setData('success', false);
    logger.error('Failed to load note data', error as Error);
  } finally {
    transaction.finish();
  }
};

// ===============================
// MIGRATION EXAMPLES
// ===============================

// Before migration (old Sentry code):
// Sentry.captureException(error, { tags: { module: 'UserService' } });

// After migration using migration helpers:
const oldCodeMigration = (error: Error) => {
  migration.captureException(error, { 
    tags: { module: 'UserService' }, 
  });
};

// Better approach using new logger:
const newApproach = (error: Error) => {
  logger.withModule('UserService').error('User service error', error);
};

// ===============================
// ADVANCED USAGE EXAMPLES
// ===============================

// Error categorization examples
const categoryExamples = {
  uiError: (error: Error) => {
    logger.error('Component crashed', error, {
      errorCategory: 'ui_error',
      component: 'NoteEditor',
    });
  },
  
  apiError: (error: Error) => {
    logger.error('Network request failed', error, {
      errorCategory: 'api_error',
      action: 'create_note',
    });
  },
  
  businessLogicError: (error: Error) => {
    logger.error('Validation failed', error, {
      errorCategory: 'validation',
      severity: 'medium',
    });
  },
  
  authError: (error: Error) => {
    logger.error('Authentication failed', error, {
      errorCategory: 'authentication',
      severity: 'critical',
    });
  },
};

// Context chaining examples
const contextChaining = () => {
  const baseLogger = logger.withModule('NoteService');
  const noteLogger = baseLogger.withComponent('NoteEditor');
  const validationLogger = noteLogger.withCategory('validation');
  
  validationLogger.warn('Note validation warning', {
    extra: { fieldName: 'title' },
  });
};

// Breadcrumb examples
const breadcrumbExample = () => {
  logger.addBreadcrumb('User clicked save button', 'user_action');
  logger.addBreadcrumb('Validation started', 'validation');
  logger.addBreadcrumb('API request initiated', 'api');
  
  // If an error occurs later, these breadcrumbs will provide context
  try {
    // ... some operation that might fail
  } catch (error) {
    logger.error('Operation failed', error as Error);
    // Breadcrumbs will be included automatically
  }
};

export const examples = {
  handleError,
  handleApiError,
  trackUserAction,
  handleProfileUpdate,
  fetchUserData,
  handleComponentError,
  handleApiFailure,
  performanceExample,
  transactionExample,
  oldCodeMigration,
  newApproach,
  categoryExamples,
  contextChaining,
  breadcrumbExample,
}; 