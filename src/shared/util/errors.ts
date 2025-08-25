export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message || 'Cannot authorize user');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Safely converts unknown error to Error instance
 * Useful for catch blocks where error type is unknown
 * 
 * @param error - Unknown error from catch block
 * @returns Error instance
 * 
 * @example
 * ```typescript
 * try {
 *   await someOperation();
 * } catch (error) {
 *   logger.error('Operation failed', toError(error));
 * }
 * ```
 */
export const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }
  
  if (typeof error === 'string') {
    return new Error(error);
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return new Error(String(error.message));
  }
  
  return new Error('Unknown error occurred');
};